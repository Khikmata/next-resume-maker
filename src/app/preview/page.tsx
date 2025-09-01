import Image from 'next/image'
import Link from 'next/link'
import profile from '../../../public/resumes/example1.webp'

export default function Preview() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 flex flex-col">
      <main className="justify-center align-middle w-full flex flex-1 flex-col h-full items-center">
        <div className="m-0-auto w-4xl h-full">
          <h1 className="text-3xl mb-4">На выбор тока эти пока)</h1>
          <div className="">
            <Link
              href="/create?type=classic"
              className="block overflow-clip relative max-w-sm group rounded-sm "
            >
              <Image
                src={profile}
                className=" hover:brightness-[0.2] duration-300 hover:scale-[1.04]"
                alt="Резюме 1"
              />
              <p className="opacity-0 group-hover:opacity-100 text-2xl duration-300s absolute top-[50%] left-[50%] transform -translate-x-[50%] pointer-events-none">
                Выбрать этот)
              </p>
            </Link>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  )
}
