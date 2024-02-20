import { createLogger, format, transports } from 'winston'

const { combine, colorize, printf } = format

const messageFormat = printf(({ level, message }) => {
  return `${new Date()} ${level}: ${message}`
})

const logger = createLogger({
  format: combine(
    format((info) => {
      info.level = info.level.toUpperCase()
      return info
    })(),
    colorize(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    messageFormat,
  ),
  transports: [new transports.Console()],
})

export default logger
