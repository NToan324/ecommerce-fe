import Link from 'next/link'

export default function Footer() {
  const footerLinks = [
    {
      name: 'About us',
      subs: [
        { name: 'COMPX', href: '#' },
        { name: 'Development team', href: '#' }
      ]
    },
    {
      name: 'Support',
      subs: [
        { name: 'Service', href: '#' },
        { name: 'Purchasing', href: '#' }
      ]
    },
    {
      name: 'Policy',
      subs: [
        { name: 'Term of use', href: '#' },
        { name: 'Warranty policy', href: '#' },
        { name: 'Inspection & Return Policy', href: '#' },
        { name: 'Shipping Policy', href: '#' },
        { name: 'Payment Policy', href: '#' },
        { name: 'Personal Data Protection Policy', href: '#' }
      ]
    }
  ]
  return (
    <footer>
      <div className='flex flex-col items-center justify-between gap-6'>
        <div className='flex w-full flex-col items-center justify-between gap-10 px-[120px] py-10'>
          <h1 className='w-full text-start text-2xl font-bold'>COMPX</h1>
          <div className='flex w-full items-center justify-between gap-8'>
            <div className='flex w-1/2 max-w-[520px] flex-col items-start justify-between gap-2'>
              <h3 className='from-blue-secondary via-blue-secondary bg-gradient-to-r to-black bg-clip-text text-[55px] font-medium text-transparent uppercase'>
                we would love to hear from you
              </h3>
              <div className='flex items-center justify-start gap-4'>
                <p>Your needs come first at Compx</p>
                <span className='block h-px w-[200px] bg-black'></span>
              </div>
              <p>where shopping feels personal, simple, and caring.</p>
            </div>
            <div className='flex w-1/2 items-start justify-between gap-18'>
              {footerLinks.map((link, index) => {
                return (
                  <div className='flex flex-col items-start justify-between gap-2' key={index}>
                    <h4 className='text-sm font-bold'>{link.name}</h4>
                    {link.subs.map((sub, subIndex) => (
                      <Link key={subIndex} href={sub.href} className='text-sm font-medium'>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='text-cente py-4 text-[16px] text-black/35'>&copy; 2025 Compx. All rights reserved</div>
      </div>
    </footer>
  )
}
