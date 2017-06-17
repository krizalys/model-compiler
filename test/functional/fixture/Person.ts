class Person
{
    private _firstName: string;

    private _lastName: string;

    private _age: number;

    public constructor(
        firstName: string = "",
        lastName: string = "",
        age: number = 0
    )
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    public set firstName(firstName: string)
    {
        this._firstName = firstName;
    }

    public get firstName(): string
    {
        return this._firstName;
    }

    public set lastName(lastName: string)
    {
        this._lastName = lastName;
    }

    public get lastName(): string
    {
        return this._lastName;
    }

    public set age(age: number)
    {
        this._age = age;
    }

    public get age(): number
    {
        return this._age;
    }
}
