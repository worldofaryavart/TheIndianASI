'use client'

import { useState, useEffect, JSX } from 'react'
import { Copy, Check, Code, Quote, ExternalLink } from 'lucide-react'

interface MarkdownPreviewProps {
  source: string
}

interface CodeBlockProps {
  code: string
  language?: string
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-t-xl px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-md bg-slate-700/50">
            <Code size={14} />
          </div>
          <span className="text-sm font-medium text-slate-300">
            {language || 'code'}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-md transition-all"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-slate-900/50 border border-slate-700/50 border-t-0 rounded-b-xl p-4 overflow-x-auto">
        <code className="text-slate-200 text-sm font-mono leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  )
}

export default function MarkdownPreview({ source }: MarkdownPreviewProps) {
  const [parsedContent, setParsedContent] = useState<JSX.Element[]>([])

  useEffect(() => {
    const parseMarkdown = (text: string): JSX.Element[] => {
      const lines = text.split('\n')
      const elements: JSX.Element[] = []
      let currentElement = ''
      let elementType = 'p'
      let inCodeBlock = false
      let codeLanguage = ''
      let codeContent = ''
      let listItems: string[] = []
      let inList = false
      let tableRows: string[][] = []
      let inTable = false
      let tableHeaders: string[] = []
      let key = 0

      const flushElement = () => {
        if (currentElement.trim()) {
          elements.push(createTextElement(elementType, currentElement, key++))
          currentElement = ''
        }
      }

      const flushList = () => {
        if (listItems.length > 0) {
          elements.push(
            <ul key={key++} className="list-disc list-inside space-y-2 my-6 pl-4">
              {listItems.map((item, index) => (
                <li key={index} className="text-slate-300 leading-relaxed">
                  {parseInlineMarkdown(item)}
                </li>
              ))}
            </ul>
          )
          listItems = []
          inList = false
        }
      }

      const flushTable = () => {
        if (tableRows.length > 0) {
          elements.push(
            <div key={key++} className="my-6 overflow-x-auto">
              <table className="min-w-full border border-slate-700/50 rounded-lg overflow-hidden">
                {tableHeaders.length > 0 && (
                  <thead className="bg-slate-800/50">
                    <tr>
                      {tableHeaders.map((header, index) => (
                        <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-white border-b border-slate-700/50">
                          {parseInlineMarkdown(header.trim())}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody className="bg-slate-900/20">
                  {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-slate-700/30 hover:bg-slate-800/20">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 text-sm text-slate-300">
                          {parseInlineMarkdown(cell.trim())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
          tableRows = []
          tableHeaders = []
          inTable = false
        }
      }

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        // Handle code blocks
        if (line.startsWith('```')) {
          if (inCodeBlock) {
            elements.push(<CodeBlock key={key++} code={codeContent.trim()} language={codeLanguage} />)
            codeContent = ''
            codeLanguage = ''
            inCodeBlock = false
          } else {
            flushElement()
            flushList()
            flushTable()
            inCodeBlock = true
            codeLanguage = line.slice(3).trim()
          }
          continue
        }

        if (inCodeBlock) {
          codeContent += line + '\n'
          continue
        }

        // Handle tables
        if (line.includes('|') && line.trim().startsWith('|') && line.trim().endsWith('|')) {
          flushElement()
          flushList()
          
          const cells = line.split('|').slice(1, -1) // Remove empty first and last elements
          
          // Check if next line is a separator (table header indicator)
          const nextLine = lines[i + 1]
          const isHeaderSeparator = nextLine && nextLine.includes('|') && nextLine.includes('-')
          
          if (!inTable) {
            inTable = true
            if (isHeaderSeparator) {
              tableHeaders = cells
              i++ // Skip the separator line
              continue
            }
          }
          
          if (!isHeaderSeparator) {
            tableRows.push(cells)
          }
          continue
        } else if (inTable) {
          flushTable()
        }

        // Handle list items
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          flushElement()
          flushTable()
          if (!inList) inList = true
          listItems.push(line.trim().slice(2))
          continue
        } else if (inList && !line.trim().startsWith('- ') && !line.trim().startsWith('* ') && line.trim() !== '') {
          flushList()
        }

        // Handle headings
        if (line.startsWith('#')) {
          flushElement()
          flushList()
          flushTable()
          const level = line.match(/^#+/)?.[0].length || 1
          const text = line.replace(/^#+\s*/, '')
          elementType = `h${level}` 
          currentElement = text
          flushElement()
          continue
        }

        // Handle blockquotes and HTML comments (author quotes)
        if (line.startsWith('>') || line.trim().startsWith('<!--')) {
          flushElement()
          flushList()
          flushTable()
          
          let quoteText = ''
          let authorText = ''
          let quoteNumber = ''
          
          if (line.startsWith('>')) {
            quoteText = line.replace(/^>\s*/, '')
            
            // Check if the quote starts with a number (like "99")
            const numberMatch = quoteText.match(/^(\d+)\s*(.*)/)
            if (numberMatch) {
              quoteNumber = numberMatch[1]
              quoteText = numberMatch[2]
            }
          } else if (line.trim().startsWith('<!--') && line.trim().endsWith('-->')) {
            // Handle author attribution in HTML comment
            authorText = line.replace(/<!--\s*—?\s*/, '').replace(/\s*-->/, '')
          }
          
          // Collect multi-line quote content
          let j = i + 1
          while (j < lines.length) {
            const nextLine = lines[j]
            
            // Check for author attribution
            if (nextLine.trim().startsWith('<!--') && nextLine.trim().endsWith('-->')) {
              authorText = nextLine.replace(/<!--\s*—?\s*/, '').replace(/\s*-->/, '')
              i = j // Skip to this line
              break
            }
            // Check for continuation of quote or end marker
            else if (nextLine.startsWith('>')) {
              quoteText += ' ' + nextLine.replace(/^>\s*/, '')
              i = j
            }
            // Check for arrow end marker (-->)
            else if (nextLine.trim() === '-->' || nextLine.trim().startsWith('-->')) {
              i = j // Skip to this line
              break
            }
            // Check for bullet points within quote
            else if (nextLine.trim().startsWith('•') || nextLine.trim().startsWith('*') || nextLine.trim().startsWith('-')) {
              quoteText += '\n' + nextLine.trim()
              i = j
            }
            // Empty line or other content - end of quote
            else {
              break
            }
            j++
          }
          
          elements.push(
            <blockquote key={key++} className="border-l-4 border-slate-600 pl-6 my-6 bg-slate-800/20 py-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Quote size={16} className="text-slate-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  {quoteNumber && (
                    <div className="text-6xl font-black text-slate-600/30 leading-none mb-2">
                      {quoteNumber}
                    </div>
                  )}
                  {quoteText && (
                    <div className="text-slate-300 leading-relaxed">
                      {quoteText.includes('\n') ? (
                        <div className="space-y-2">
                          {quoteText.split('\n').map((line, idx) => {
                            if (line.trim().startsWith('•') || line.trim().startsWith('*') || line.trim().startsWith('-')) {
                              return (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="text-slate-500 mt-1">•</span>
                                  <span>{parseInlineMarkdown(line.replace(/^[•*-]\s*/, ''))}</span>
                                </div>
                              )
                            }
                            return line.trim() ? (
                              <p key={idx}>{parseInlineMarkdown(line)}</p>
                            ) : null
                          })}
                        </div>
                      ) : (
                        <p className="italic">{parseInlineMarkdown(quoteText)}</p>
                      )}
                    </div>
                  )}
                  {authorText && (
                    <cite className="text-slate-400 text-sm not-italic block mt-3">
                      — {authorText}
                    </cite>
                  )}
                </div>
              </div>
            </blockquote>
          )
          continue
        }

        // Handle horizontal rules
        if (line.trim() === '---' || line.trim() === '***') {
          flushElement()
          flushList()
          flushTable()
          elements.push(
            <div key={key++} className="my-8 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            </div>
          )
          continue
        }

        // Handle empty lines
        if (line.trim() === '') {
          flushElement()
          continue
        }

        // Regular text
        if (currentElement) currentElement += ' '
        currentElement += line
        elementType = 'p'
      }

      // Flush remaining content
      flushElement()
      flushList()
      flushTable()

      return elements
    }

    const createTextElement = (type: string, content: string, key: number): JSX.Element => {
      const className = getElementClassName(type)
      const Tag = type as keyof JSX.IntrinsicElements

      return (
        <Tag key={key} className={className}>
          {parseInlineMarkdown(content)}
        </Tag>
      )
    }

    const getElementClassName = (type: string): string => {
      const classMap: Record<string, string> = {
        h1: 'text-4xl font-black text-white mb-6 mt-12 first:mt-0 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent',
        h2: 'text-3xl font-bold text-white mb-5 mt-10 first:mt-0 border-b border-slate-700 pb-3',
        h3: 'text-2xl font-semibold text-white mb-4 mt-8 first:mt-0',
        h4: 'text-xl font-semibold text-slate-200 mb-3 mt-6 first:mt-0',
        h5: 'text-lg font-semibold text-slate-200 mb-3 mt-6 first:mt-0',
        h6: 'text-base font-semibold text-slate-300 mb-2 mt-4 first:mt-0',
        p: 'text-slate-300 leading-relaxed mb-6 text-base'
      }
      return classMap[type] || 'text-slate-300 leading-relaxed mb-6'
    }

    const parseInlineMarkdown = (text: string): (string | JSX.Element)[] => {
      const parts: (string | JSX.Element)[] = []
      let remaining = text
      let partKey = 0

      // Handle images first (they have similar syntax to links but with !)
      remaining = remaining.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        const placeholder = `__IMAGE_${partKey}__`
        parts.push(
          <div key={partKey++} className="my-6 flex flex-col items-center">
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-lg border border-slate-700/50 shadow-lg"
            />
            {alt && (
              <caption className="mt-2 text-sm text-slate-400 italic text-center">
                {alt}
              </caption>
            )}
          </div>
        )
        return placeholder
      })

      // Handle inline code
      remaining = remaining.replace(/`([^`]+)`/g, (match, code) => {
        const placeholder = `__INLINE_CODE_${partKey}__`
        parts.push(
          <code key={partKey++} className="bg-slate-800/60 text-slate-200 px-2 py-1 rounded text-sm font-mono border border-slate-700/50">
            {code}
          </code>
        )
        return placeholder
      })

      // Handle links
      remaining = remaining.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        const placeholder = `__LINK_${partKey}__`
        parts.push(
          <a
            key={partKey++}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white underline decoration-slate-600 hover:decoration-white transition-all inline-flex items-center gap-1"
          >
            {text}
            <ExternalLink size={12} />
          </a>
        )
        return placeholder
      })

      // Handle bold
      remaining = remaining.replace(/\*\*([^*]+)\*\*/g, (match, text) => {
        const placeholder = `__BOLD_${partKey}__`
        parts.push(
          <strong key={partKey++} className="font-semibold text-white">
            {text}
          </strong>
        )
        return placeholder
      })

      // Handle italic
      remaining = remaining.replace(/\*([^*]+)\*/g, (match, text) => {
        const placeholder = `__ITALIC_${partKey}__`
        parts.push(
          <em key={partKey++} className="italic text-slate-200">
            {text}
          </em>
        )
        return placeholder
      })

      // Split by placeholders and reconstruct
      const finalParts: (string | JSX.Element)[] = []
      const placeholderRegex = /__(?:IMAGE|INLINE_CODE|LINK|BOLD|ITALIC)_\d+__/g
      const tokens = remaining.split(placeholderRegex)
      const placeholders = remaining.match(placeholderRegex) || []

      let tokenIndex = 0
      let placeholderIndex = 0

      while (tokenIndex < tokens.length || placeholderIndex < placeholders.length) {
        if (tokenIndex < tokens.length && tokens[tokenIndex]) {
          finalParts.push(tokens[tokenIndex])
        }
        tokenIndex++

        if (placeholderIndex < placeholders.length) {
          const placeholder = placeholders[placeholderIndex]
          const partIndex = parseInt(placeholder.match(/_(\d+)__$/)?.[1] || '0')
          if (parts[partIndex]) {
            finalParts.push(parts[partIndex])
          }
          placeholderIndex++
        }
      }

      return finalParts.length > 0 ? finalParts : [text]
    }

    setParsedContent(parseMarkdown(source))
  }, [source])

  return (
    <div className="markdown-preview">
      <div className="space-y-1">
        {parsedContent}
      </div>
    </div>
  )
}