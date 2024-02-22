import { Controller, Get, Post, HttpCode, Res, Req, Header, Redirect, Param, Body, Put, Delete } from "@nestjs/common";
import { CreateHeroDto } from "./DTO/create-hero.dto";
import { UpdateHeroDto } from "./DTO/update-hero.dto";
import { HeroService } from './hero.service';

@Controller("hero")
export class heroController{
    constructor(private heroService: HeroService){}

    @Get('index')
    @HttpCode(200)
    @Header('Content-Type', 'application/json')
    index(@Res() response){
        response.json(this.heroService.findAll())
    }

    @Get('detail/:id')
    show(@Param('id') id: number){
        const persona = this.heroService.findAll().filter((persona) => {
            return persona.id == id
        })

        return persona[0]
    }

    @Get('create')
    create(@Res({passthrough: true}) response): string {
        response.cookie('name', 'cungcailin');
        return 'create hero'
    }

    @Post('store')
    @HttpCode(201)
    store(
        @Req() request, 
        @Body() createHeroDto: CreateHeroDto,  
        @Res({passthrough: true}) response
    ){
        try {
            // const {id, name, arcana, img} = request.body
        
            // personas.push({
            //     id,
            //     name,
            //     arcana,
            //     img
            // })
        
            // return personas
            this.heroService.create(createHeroDto)
            return this.heroService.findAll()
        } catch (error) {
            response.status(500).json({msg: error})
        }
    }

    @Put("update/:id")
    update(@Param('id') id: number, @Body() updateHeroDto: UpdateHeroDto){
        this.heroService.findAll().filter((persona) => {
            if(persona.id == id){
                persona.name = updateHeroDto.name;
                persona.arcana = updateHeroDto.arcana
            }
        })

        return this.heroService.findAll();
    }

    @Delete("destroy/:id")
    destroy(@Param('id') id: number){
        const persona = this.heroService.findAll().filter((persona) => {
            return persona.id != id
        })

        return persona
    }


    @Get("/welcome")
    @Redirect('https://docs.nestjs.com/')
    hello(){
        return 'welcome'
    }
}
