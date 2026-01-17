import { useState } from 'react'
import html2canvas from 'html2canvas'
import { PaymentNotification } from './PaymentNotification'
import { EmailNotification } from './EmailNotification'

interface ScreenshotData {
  amount: string
  type: 'notification' | 'email'
  username?: string
}

const defaultScreenshots: ScreenshotData[] = [
  { amount: '2.34', type: 'notification' },
  { amount: '194.1599137', type: 'email', username: 'fchollet' },
  { amount: '310.61', type: 'notification' },
  { amount: '53.13', type: 'email', username: 'ravihanda' },
]

export function PaymentGenerator() {
  const [username, setUsername] = useState('')
  const [amount, setAmount] = useState('')
  const [screenshots, setScreenshots] = useState<ScreenshotData[]>(defaultScreenshots)
  const [isGenerating, setIsGenerating] = useState(false)

  function formatAmount(value: string): string {
    return value.replace(/[^0-9.]/g, '')
  }

  async function captureScreenshot(index: number): Promise<string | null> {
    const element = document.getElementById(`screenshot-${index}`)
    if (!element) return null

    // Find the actual content wrapper to capture
    const item = screenshots[index]
    const content = element.querySelector(
      item.type === 'email' ? '.email-notification' : '.payment-notification'
    ) as HTMLElement || element.firstElementChild as HTMLElement

    if (!content) return null

    try {
      const canvas = await html2canvas(content, {
        backgroundColor: item.type === 'email' ? '#ffffff' : '#000000',
        scale: 2,
        logging: false,
        useCORS: true,
      })
      return canvas.toDataURL('image/png')
    } catch (error) {
      console.error('Capture error:', error)
      return null
    }
  }

  async function handleDownload(index: number) {
    setIsGenerating(true)
    const dataUrl = await captureScreenshot(index)
    if (dataUrl) {
      const item = screenshots[index]
      const link = document.createElement('a')
      link.download = `got-paid-${item.username || 'user'}-${item.amount}.png`
      link.href = dataUrl
      link.click()
    }
    setIsGenerating(false)
  }

  async function handleCopy(index: number) {
    setIsGenerating(true)
    const element = document.getElementById(`screenshot-${index}`)
    if (!element) {
        setIsGenerating(false)
        return
    }
    
    // Find content similar to captureScreenshot
    const item = screenshots[index]
    const content = element.querySelector(
        item.type === 'email' ? '.email-notification' : '.payment-notification'
    ) as HTMLElement || element.firstElementChild as HTMLElement

    if (!content) {
        setIsGenerating(false)
        return
    }

    try {
      const canvas = await html2canvas(content, {
        backgroundColor: item.type === 'email' ? '#ffffff' : '#000000',
        scale: 2,
        logging: false,
        useCORS: true,
      })
      
      canvas.toBlob(async (blob) => {
        if (!blob) return
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
          alert('Copied to clipboard!')
        } catch (err) {
          console.error('Failed to copy:', err)
          alert('Failed to copy to clipboard')
        }
      })
    } catch (error) {
      console.error('Copy error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleGenerate() {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    // Generate 4 variations based on the input amount
    const newScreenshots: ScreenshotData[] = [
      { amount, type: 'notification' }, // Push notification
      { amount, type: 'email', username: username || 'user' }, // Email with username
      { amount, type: 'notification' }, // Another push notification (can be customized if needed, currently same as first)
      { amount, type: 'email', username: username || 'user' }, // Another email
    ]

    setScreenshots(newScreenshots)
    // Don't clear inputs so user can regenerate easily
  }

  return (
    <div className="generator-container split-layout">
      <div className="form-section">
        <div className="generator-header">
          <h1>Generate Payment Screenshot</h1>
          <p>Create custom "You got paid!" notifications</p>
        </div>

        <div className="generator-form">
          <div className="form-group">
            <label htmlFor="username">Username (optional)</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              id="amount"
              type="text"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(formatAmount(e.target.value))}
              className="form-input"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!amount || parseFloat(amount) <= 0}
            className="generate-button"
          >
            Generate All 4 Styles
          </button>
        </div>
      </div>

      <div className="grid-section">
        <div className="grid-container">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="grid-item-wrapper" id={`screenshot-${index}`}>
              <div className="grid-item-content">
                {screenshot.type === 'email' ? (
                  <EmailNotification 
                    amount={screenshot.amount} 
                    username={screenshot.username || ''} 
                  />
                ) : (
                  <PaymentNotification amount={screenshot.amount} />
                )}
              </div>
              <div className="grid-overlay">
                <button 
                  onClick={() => handleDownload(index)}
                  disabled={isGenerating}
                  className="action-button download-btn"
                >
                  Download
                </button>
                <button 
                  onClick={() => handleCopy(index)}
                  disabled={isGenerating}
                  className="action-button copy-btn"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
