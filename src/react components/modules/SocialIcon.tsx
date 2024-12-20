/* eslint-disable @eslint-react/no-missing-key */
import type { ReactNode, SVGProps} from 'react'
import { memo, useMemo } from 'react'

import { MotionButtonBase } from 'src/react components/ui/button'
import { FloatPopover } from 'src/react components/ui/float-popover'
import { XIcon } from '../Icons/platform/XIcon'
import { BilibiliIcon } from '../Icons/platform/BilibiliIcon'
import { BlueskyIcon } from '../Icons/platform/BlueskyIcon'

function ZhihuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078c-.271.73-.5 1.434-.68 2.11h4.587c.545-.006.445 1.168.445 1.171H9.384a58.104 58.104 0 0 1-.112 3.797h2.712c.388.023.393 1.251.393 1.266H9.183a9.223 9.223 0 0 1-.408 2.102l.757-.604c.452.456 1.512 1.712 1.906 2.177c.473.681.063 2.081.063 2.081l-2.794-3.382c-.653 2.518-1.845 3.607-1.845 3.607c-.523.468-1.58.82-2.64.516c2.218-1.73 3.44-3.917 3.667-6.497H4.491c0-.015.197-1.243.806-1.266h2.71c.024-.32.086-3.254.086-3.797H6.598c-.136.406-.158.447-.268.753c-.594 1.095-1.603 1.122-1.907 1.155c.906-1.821 1.416-3.6 1.591-4.064c.425-1.124 1.671-1.125 1.671-1.125zM13.078 6h6.377v11.33h-2.573l-2.184 1.373l-.401-1.373h-1.219zm1.313 1.219v8.86h.623l.263.937l1.455-.938h1.456v-8.86z"
      />
    </svg>
  )
}


interface SocialIconProps {
  type: string
  id: string
}

const iconSet: Record<
  string,
  [string, ReactNode, string, (id: string) => string]
> = {
  github: [
    'Github',
    <i className="i-mingcute-github-line" />,
  
    '#181717',
    (id) => `https://github.com/${id}`,
  ],
  twitter: [
    'Twitter',
    <i className="i-mingcute-twitter-line" />,
    '#1DA1F2',
    (id) => `https://twitter.com/${id}`,
  ],
  x: ['x', <XIcon />, 'rgba(36,46,54,1.00)', (id) => `https://x.com/${id}`],
  telegram: [
    'Telegram',
    <i className="i-mingcute-telegram-line" />,
    '#0088cc',
    (id) => `https://t.me/${id}`,
  ],
  mail: [
    'Email',
    <i className="i-mingcute-mail-line" />,
    '#D44638',
    (id) => `mailto:${id}`,
  ],
  get email() {
    return this.mail
  },
  get feed() {
    return this.rss
  },
  rss: ['RSS', <i className="i-mingcute-rss-line" />, '#FFA500', (id) => id],
  bilibili: [
    '哔哩哔哩',
    <BilibiliIcon />,
    '#00A1D6',
    (id) => `https://space.bilibili.com/${id}`,
  ],
  // 映射到知乎
  netease: [
    '知乎',
    <ZhihuIcon />,
    '#003efc',
    (id) => `https://www.zhihu.com/people/${id}`,
  ],
  qq: [
    'QQ',
    <i className="i-mingcute-qq-fill" />,
    '#1e6fff',
    (id) => `https://wpa.qq.com/msgrd?v=3&uin=${id}&site=qq&menu=yes`,
  ],
  wechat: [
    '微信',
    <i className="i-mingcute-wechat-fill" />,
    '#2DC100',
    (id) => id,
  ],
  // 映射到Email功能
  weibo: [
    'Email',
    <i className="i-mingcute-mail-line" />,
    '#D44638',
    (id) => `mailto:${id}`,
  ],
  discord: [
    'Discord',
    <i className="i-mingcute-discord-fill" />,
    '#7289DA',
    (id) => `https://discord.gg/${id}`,
  ],
  bluesky: [
    'Bluesky',
    <BlueskyIcon />,
    '#0085FF',
    (id) => `https://bsky.app/profile/${id}`,
  ],
}
const icons = Object.keys(iconSet)

export const isSupportIcon = (icon: string) => icons.includes(icon)
export const SocialIcon = memo((props: SocialIconProps) => {
  const { id, type } = props

  const [name, Icon, iconBg, hrefFn] = useMemo(() => {
    const [name, Icon, iconBg, hrefFn] = (iconSet as any)[type as any] || []
    return [name, Icon, iconBg, hrefFn]
  }, [type])

  if (!name) return null
  const href = hrefFn(id)

  return (
    <FloatPopover
      type="tooltip"
      triggerElement={
        <MotionButtonBase
          className="center flex aspect-square size-10 rounded-full text-2xl text-white"
          style={{
            background: iconBg,
          }}
        >
          <a
            target="_blank"
            href={href}
            className="center flex"
            rel="noreferrer"
          >
            {Icon}
          </a>
        </MotionButtonBase>
      }
    >
      {name}
    </FloatPopover>
  )
})
SocialIcon.displayName = 'SocialIcon'
