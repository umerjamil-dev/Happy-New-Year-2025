import React, { useEffect, useState } from 'react'
import { Phone, Mail, TimerIcon } from 'lucide-react'
import axios from 'axios'

const Header = () => {
  const [time, setTime] = useState('')
  const [offset, setOffset] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    // 1. Sync time once with a reliable API
    const syncTime = async () => {
      try {
        const start = Date.now()
        const res = await axios.get("https://worldtimeapi.org/api/timezone/Asia/Tokyo")
        const apiTime = new Date(res.data.datetime).getTime()
        const end = Date.now()
        const latency = (end - start) / 2
        setOffset(apiTime - (end - latency))
      } catch (error) {
        console.error('Failed to sync Japan time:', error)
      }
    }

    // 2. Fetch live USD/JPY exchange rate
    const fetchExchangeRate = async () => {
      try {
        const res = await axios.get("https://open.er-api.com/v6/latest/USD")
        if (res.data && res.data.rates && res.data.rates.JPY) {
          setExchangeRate(res.data.rates.JPY.toFixed(2))
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error)
        setExchangeRate('150.00') // Fallback value
      }
    }

    syncTime()
    fetchExchangeRate()
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date(Date.now() + offset)
      const options = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      const formatter = new Intl.DateTimeFormat('en-US', options)
      setTime(formatter.format(now))
    }

    const interval = setInterval(updateTime, 1000)
    updateTime()
    return () => clearInterval(interval)
  }, [offset])

  return (
    <section className='font-space-secondary custom-padding bg-black text-white flex justify-between items-center p-4 text-xs font-[poppins]'>
      {/* Japan Time & Exchange Rate - Always Visible */}
      <div className='flex items-center justify-start gap-4'>
        <div className='flex items-center gap-2'>
          <TimerIcon size={24} className='text-red-600' />
          <p className='text-sm sm:text-lg whitespace-nowrap'>
            Japan Time : <span className='text-red-500 font-bold ml-1'>{time}</span>
          </p>
        </div>

        {exchangeRate && (
          <div className='hidden sm:flex items-center border-l border-gray-700 pl-4 py-1'>
            <p className='text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider'>
              USD/JPY - Dollar Yen 1$=<span className='text-green-500 ml-1'>¥{exchangeRate}</span>
            </p>
          </div>
        )}
      </div>

      <div className='flex gap-4 sm:gap-6'>
        {/* Phone Number - Hidden on Mobile */}
        <div className='hidden md:flex items-center space-x-2'>
          <Phone size={18} className='text-red-600' />
          <span>+81 90-1052-1419</span>
        </div>

        {/* Email - Always Visible */}
        <div className='flex items-center space-x-2'>
          <Mail size={18} className='text-red-600' />
          <span className='hidden sm:inline'>info@siautojapan.com</span>
          <span className='sm:hidden'>Email Us</span> {/* Shorter text for very small screens */}
        </div>
      </div>
    </section>
  )
}

export default Header