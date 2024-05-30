export class Func{
    static racunFunkcija = (funkcija, x) =>{
        if(typeof x === 'string')
        x = parseFloat(x);
        let vrijednost = evaluatex(funkcija,{e:Math.E, x:x});
        let rez = vrijednost();
        return(rez);
    }
}