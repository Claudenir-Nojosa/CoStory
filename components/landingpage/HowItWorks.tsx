import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="py-24 flex flex-col items-center">
      <h2 className="mb-5 text-center font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        Como funciona
      </h2>
      <p className="mt-4 text-center max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        coStory é uma plataforma colaborativa que permite criar histórias junto
        com outras pessoas. <br />
        Quer você seja um escritor, artista ou contador de histórias, o coStory
        oferece <br />
        um espaço para você colaborar e dar vida às suas ideias.
      </p>
      <div className="mx-auto flex flex-col md:max-w-7xl md:space-y-12 mt-14">
        <div className="flex flex-col justify-between sm:flex-row sm:space-y-0">
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image
              src="/assets/Criação.png"
              alt="Criação de história"
              width={880}
              height={880}
              className="rounded-xl hidden md:flex"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center px-8 py-6 text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-primary-muted bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent">
              1° PASSO
            </h3>
            <p className="mt-2 font-semibold text-primary">
              Crie suas histórias
            </p>
            <ul className="mt-2">
              <li className="text-muted-foreground flex items-center font-light">
                Utilize sua criatividade
              </li>
              <li className="text-muted-foreground flex items-center font-light">
                Peça um incremento da Inteligência Artificial, seja completando
                um parágrafo, ou fazendo uma reviravolta na história.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between sm:flex-row sm:space-y-0">
          <div className="flex w-full flex-col items-start justify-center px-8 py-6 text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-primary-muted bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent">
              2° PASSO
            </h3>
            <p className="mt-2 font-semibold text-primary">
              Edite suas histórias
            </p>
            <ul className="mt-2">
              <li className="text-muted-foreground flex items-center font-light">
                Histórias já criadas podem ser editadas
              </li>
              <li className="text-muted-foreground flex items-center font-light">
                Caso a história não seja sua, você pode contribuir com a
                história, mandando a alteração que você incluiria para o criador
                revisar e aceitar.
              </li>
            </ul>
          </div>
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image
              src="/assets/edit.png"
              alt="Edição de história"
              width={880}
              height={880}
              className="rounded-xl hidden md:flex"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between sm:flex-row sm:space-y-0">
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image
              src="/assets/historias.png"
              alt="Histórias"
              width={880}
              height={880}
              className="rounded-xl hidden md:flex"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center px-20 py-6 text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-primary-muted bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent">
              3° PASSO
            </h3>
            <p className="mt-2 font-semibold text-primary">
              Navegue nas histórias
            </p>
            <ul className="mt-2">
              <li className="text-muted-foreground flex items-center font-light">
                Há a possibilidade de criar/editar/colaborar
              </li>
              <li className="text-muted-foreground flex items-center font-light">
                Caso tenha gostado bastante da história, você pode também favorita-la.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
