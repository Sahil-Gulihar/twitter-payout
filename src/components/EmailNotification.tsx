interface EmailNotificationProps {
  username: string
  amount: string
}

export function EmailNotification({ username, amount }: EmailNotificationProps) {
  const numAmount = parseFloat(amount) || 0
  const decimalPlaces = amount.includes('.') ? amount.split('.')[1]?.length || 2 : 2
  const maxDecimals = Math.max(2, Math.min(7, decimalPlaces))
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDecimals,
  }).format(numAmount)

  return (
    <div className="email-notification">
      <div className="email-header">
        <div className="email-subject-line">
          <h1>You got paid!</h1>
          <span className="inbox-badge">Inbox</span>
          <span className="x-badge">x</span>
        </div>
        <div className="email-meta-icons">
          <span className="icon print"></span>
          <span className="icon open"></span>
        </div>
      </div>

      <div className="email-sender-row">
        <div className="sender-profile">
          <div className="sender-avatar-img">
            <svg viewBox="0 0 24 24" fill="#1da1f2"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </div>
          <div className="sender-info">
            <span className="sender-name">X Monetization</span>
            <span className="sender-email">&lt;verify@twitter.com&gt;</span>
            <span className="email-to">to me</span>
          </div>
        </div>
        <div className="email-date">
          18:07 (17 minutes ago)
          <div className="action-icons">
             <span className="star-icon">☆</span>
             <span className="reply-icon">↩</span>
             <span className="more-icon">⋮</span>
          </div>
        </div>
      </div>

      <div className="email-body-content">
        <div className="x-logo-container">
          <div className="x-logo-box">
             <svg viewBox="0 0 24 24" className="x-logo-svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </div>
        </div>
        
        <p className="greeting">Hey @{username || 'user'},</p>
        
        <p className="amount-text">
          {formattedAmount} has been deposited into your account <br/>
          from X Ads Revenue Sharing.
        </p>

        <p className="thank-you">Thank you for creating on X.</p>
        
        <p className="signature">X Monetization</p>
      </div>
    </div>
  )
}
