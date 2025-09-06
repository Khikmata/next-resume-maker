import { Button } from '@/shared/components'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-4 gap-16 flex flex-col">
      <main className="justify-center align-middle w-full flex flex-1 flex-col h-full items-center">
        <div className="m-0-auto">
          <h1 className="self-start text-3xl mb-2">Привет</h1>
          <p className="text-neutral-500 mb-4">
            {' '}
            Вы можете создать резюме сразу или авторизоваться
          </p>
          <div className="flex justify-between items-center">
            <Button>
              <Link href="/create">Создать резюме</Link>
            </Button>
            <p className="text-neutral-400">/</p>
            <Button variant="outline">Авторизоваться</Button>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-4 flex-wrap items-center justify-center text-neutral-500 hover:brightness-150">
        <Image
          src="/github-mark.svg"
          width={24}
          height={24}
          alt="github автора"
        ></Image>
        <a href="https://github.com/Khikmata">https://github.com/Khikmata</a>
      </footer>
    </div>
  )
}
