interface EmailNotificationProps {
  username: string
  amount: string
  variant?: 'default' | 'dark-blue' | 'mobile'
}

export function EmailNotification({ username, amount, variant = 'default' }: EmailNotificationProps) {
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
    <div className={`email-notification ${variant === 'mobile' ? 'email-mobile' : ''} ${variant === 'dark-blue' ? 'email-dark-blue' : ''}`}>
      <div className="email-header">
        <div className="email-subject-line">
          <h1>You got paid!</h1>
          <span className="inbox-badge">Inbox</span>
        </div>
        {variant !== 'mobile' && (
          <div className="email-meta-icons">
            <span className="icon print"></span>
            <span className="icon open"></span>
          </div>
        )}
      </div>

      <div className="email-sender-row">
        <div className="sender-profile">
          <div className="sender-avatar-placeholder">
            XM
          </div>
          <div className="sender-info">
            <span className="sender-name">X Monetization</span>
            <span className="sender-email">&lt;monetization@x.com&gt;</span>
            <span className="email-to">to me</span>
          </div>
        </div>
        <div className="email-date">
          {variant !== 'mobile' ? '18:07 (17 minutes ago)' : '18:07'}
          <div className="action-icons">
             <span className="star-icon">☆</span>
             <span className="reply-icon">↩</span>
             <span className="more-icon">⋮</span>
          </div>
        </div>
      </div>

      <div className="email-body-content">
        <div className="x-logo-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="x-logo-box">
             <svg viewBox="0 0 24 24" className="x-logo-svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </div>
        </div>
        
        <p className="greeting">Hey @{username || 'user'},</p>
        
        <p className="amount-text">
          {formattedAmount} has been deposited into your account <br/>
          from X Creator Revenue Sharing.
        </p>

        <p className="thank-you">Thank you for creating on X.</p>
        
        <p className="signature">X Monetization</p>

        <div className="email-footer" style={{ marginTop: '32px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
          <p style={{ margin: '0 0 4px 0' }}>This email was sent to {username ? `${username}@gmail.com` : 'you@example.com'}</p>
          <p style={{ margin: 0 }}>X Corp. 1355 Market Street, Suite 900 San Francisco, CA 94103</p>
        </div>
      </div>
    </div>
  )
}
