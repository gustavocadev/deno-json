import type { User, UserJSON } from './types.ts';
import { ApplicationJSON } from './appjson.ts'
import * as colors from 'https://deno.land/std/fmt/colors.ts'

const appjson = new ApplicationJSON("users");

while (true) {
    console.log('');
    console.log(colors.yellow('base de datos (written in Deno 🦕)⚡'));
    const option = appjson.menu()
    const {users} = await appjson.readJSON()
    if (option === 1) {
        console.log("Let's add new users");
        const name = prompt("ingrese su nombre") as string
        const age = Number(prompt("Ingresa tu edad"))

        const newUser = {
            name: name.toLowerCase(),
            age,
            id: crypto.randomUUID()
        }

        users.push(newUser)

        await appjson.writeJSON(users)

    } else if (option === 2) {
        const name = prompt('Ingrese el nombre del usuario') as string

        const newUsers = users.filter(user => user.name !== name.toLowerCase()) 

        await appjson.writeJSON(newUsers)
    } else if (option === 3) {

        for (const user of users) {
            console.log(colors.green(`mi nombre es ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}`));
            console.log(colors.cyan(`mi nombre es ${user.age}`));
            console.log('-----');
        }
    } else if (option === 4) {
        const name = prompt("ingrese el nombre del usuario a quie desea editar") as string
        const foundUser = users.find((user: User) => user.name === name) as User

        const property = prompt("Qué dato desea editar")
        if (property === 'age') {
            const newAge = Number(prompt("Ingrese la nueva edad: "))
            foundUser.age = newAge
        }
        if (property === 'name') {
            const newName =  prompt("Ingrese el nuevo nombre: ") as string
            foundUser.name = newName
        }
        await appjson.writeJSON(users)
    } else if (option === 5) {
        break
    }
}