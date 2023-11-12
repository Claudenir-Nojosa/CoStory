"use client";

import { Contributor } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import "dayjs/locale/pt-br";

import { Separator } from "../ui/separator";
import Image from "next/image";
import Link from "next/link";

interface ContributionsProps {}

const Contributions: FC<ContributionsProps> = ({}) => {
  const { data: dataContributions, isLoading: isLoadingContributions } =
    useQuery({
      queryKey: ["contributions"],
      queryFn: async () => {
        const { data } = await axios.get("/api/story/contributions");
        return data.contributions;
      },
    });
  console.log(dataContributions);

  const formatDate = (date: string) => {
    const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", new Date());
    return format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">Contribuições da história</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Aceitas</AccordionTrigger>
          <AccordionContent>
            {dataContributions &&
              dataContributions
                .filter((contribution: any) => contribution.isAccepted)
                .map((contribution: any) => (
                  <div key={contribution.id}>
                    <p>{contribution.user.name}</p>
                    <p>{contribution.newContent}</p>
                  </div>
                ))}
            {dataContributions &&
              dataContributions.filter(
                (contribution: any) => contribution.isAccepted
              ).length === 0 && <p>Ops, como está vazio aqui.</p>}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Pendentes</AccordionTrigger>
          <AccordionContent>
            {dataContributions &&
              dataContributions
                .filter((contribution: any) => !contribution.isAccepted)
                .map((contribution: any) => (
                  <Card
                    key={contribution.id}
                    className="flex mb-5 justify-start items-center"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center">
                            Colaborador
                          </TableHead>
                          <TableHead className="text-center">Data</TableHead>
                          <TableHead className="text-right">...</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center flex-col">
                              {contribution.user && (
                                <Avatar>
                                  <AvatarImage src={contribution.user.image} />
                                </Avatar>
                              )}
                              <p>{contribution.user.name}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {formatDate(contribution.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Link href="/">
                              <Image
                                src="/assets/lupa.svg"
                                alt="Lupa"
                                height={20}
                                width={20}
                              />
                            </Link>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                ))}
            {dataContributions &&
              dataContributions.filter(
                (contribution: any) => !contribution.isAccepted
              ).length === 0 && <p>Ops, como está vazio aqui.</p>}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Contributions;
