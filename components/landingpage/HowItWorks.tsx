import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="py-24">
      <h2 className="mb-5 text-center text-5xl font-bold">Como funciona</h2>
      <p className="mt-4 text-lg text-muted-foreground">coStory é uma plataforma colaborativa que permite criar histórias junto com outras pessoas. <br/>Quer você seja um escritor, artista ou contador de histórias, o coStory oferece <br/>um espaço para você colaborar e dar vida às suas ideias.</p>
      <div className="mx-auto flex flex-col md:max-w-7xl md:space-y-12 mt-14">
        <div className="flex flex-col justify-between sm:flex-row sm:space-y-0">
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image src="/assets/logo.ico" alt="" width={30} height={30} />
          </div>
          <div className="flex w-full flex-col items-start justify-center px-8 py-6 text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-primary-muted">1° PASSO</h3>
            <p className="mt-2 font-semibold text-primary">
              Explicação do primeiro passo
            </p>
            <ul className="mt-2">
              <li className="text-muted-foreground flex items-center font-light">
                Passo
              </li>
              <li className="text-muted-foreground flex items-center font-light">
                Passo
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between sm:flex-row sm:space-y-0">
          <div className="flex w-full flex-col items-start justify-center px-8 py-6 text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-primary-muted">2° PASSO</h3>
            <p className="mt-2 font-semibold text-primary">
              Explicação do primeiro passo
            </p>
            <ul className="mt-2">
              <li className="text-muted-foreground flex items-center font-light">
                Passo
              </li>
              <li className="text-muted-foreground flex items-center font-light">
                Passo
              </li>
            </ul>
          </div>
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image src="/assets/logo.ico" alt="" width={30} height={30} />
          </div>
        </div>
        <div className="flex flex-col justify-between sm:flex-row sm:space-y-0">
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image src="/assets/logo.ico" alt="" width={30} height={30} />
          </div>
          <div className="flex w-full flex-col items-start justify-center px-8 py-6 text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-primary-muted">3° PASSO</h3>
            <p className="mt-2 font-semibold text-primary">
              Explicação do primeiro passo
            </p>
            <ul className="mt-2">
              <li className="text-muted-foreground flex items-center font-light">
                Passo
              </li>
              <li className="text-muted-foreground flex items-center font-light">
                Passo
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
