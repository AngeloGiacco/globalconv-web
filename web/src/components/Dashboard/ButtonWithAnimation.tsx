import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface ButtonWithAnimationProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
  variant?: 'default' | 'outline'
  disabled?: boolean
}

const ButtonWithAnimation: React.FC<ButtonWithAnimationProps> = ({
  children,
  onClick,
  className,
  variant = 'default',
  disabled = false,
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button onClick={onClick} className={className} variant={variant} disabled={disabled}>
      {children}
    </Button>
  </motion.div>
)

export default ButtonWithAnimation 