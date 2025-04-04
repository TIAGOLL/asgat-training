import { LoaderIcon, type LucideProps } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Loader({ className, ...props }: LucideProps) {
	return <LoaderIcon {...props} className={cn('animate-spin text-black', className)} />
}
