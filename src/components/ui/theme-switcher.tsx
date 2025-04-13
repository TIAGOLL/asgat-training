import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/theme-provider';

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  async function handleTheme() {
    const togleTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(togleTheme);
  }

  return (
    <Button variant='outline' size='icon' onClick={() => handleTheme()}>
      <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
    </Button>
  );
}
