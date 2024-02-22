import { Injectable } from "@nestjs/common";
import { Hero } from './interface/hero.interface'

@Injectable()
export class HeroService{
    private readonly heroes: Hero[] = [
        {
            id: 1,
            name: "Orpheus",
            arcana: "Fool",
            img: "orpheus.jpg"
        },
        {
            id: 2,
            name: "Thanatos",
            arcana: "Death",
            img: "thanatos.jpg"
        },
        {
            id: 3,
            name: "Messiah",
            arcana: "Judgement",
            img: "messiah.jpg"
        }
    ]

    create(hero: Hero){
        this.heroes.push(hero)
    }

    findAll(): Hero[]{
        return this.heroes
    }
}