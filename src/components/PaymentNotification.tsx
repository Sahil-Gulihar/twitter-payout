interface PaymentNotificationProps {
  amount: string
  variant?: 'default' | 'dark-blue' | 'mobile'
}

export function PaymentNotification({ amount, variant = 'default' }: PaymentNotificationProps) {
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
    <div className={`payment-notification ${variant === 'dark-blue' ? 'notification-dark-blue' : ''}`}>
      <div className="notification-icon">
        <span role="img" aria-label="party popper">🎉</span>
      </div>
      <div className="notification-content">
        <div className="notification-header">
          <span className="app-name">You got paid!</span>
        </div>
        <div className="notification-body">
          {formattedAmount} has been deposited into your account.
        </div>
      </div>
    </div>
  )
}
