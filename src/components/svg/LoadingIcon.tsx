import { FunctionComponent } from 'react'
import { motion } from 'framer-motion'

const colors = ['#9ef7d9', '#40efb5', '#10b981', '#085b40']

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  }
}

const dotVariants = {
  initial: {},
  animate: {
    height: [40, 100, 40],
    transition: {
      repeat: Infinity
    }
  }
}

const LoadingIcon: FunctionComponent = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{
        display: 'flex',
        gap: 16,
        height: 100,
        alignItems: 'center'
      }}
    >
      {Array(4)
        .fill(null)
        .map((_, index) => {
          return (
            <motion.div
              key={index}
              variants={dotVariants}
              style={{
                height: 40,
                width: 40,
                backgroundColor: colors[index % colors.length],
                borderRadius: 20
              }}
            />
          )
        })}
    </motion.div>
  )
}

export default LoadingIcon
