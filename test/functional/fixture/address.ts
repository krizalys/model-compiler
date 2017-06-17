class address
{
    private _post-office-box: string;

    private _extended-address: string;

    private _street-address: string;

    private _locality: string;

    private _region: string;

    private _postal-code: string;

    private _country-name: string;

    public constructor(
        post-office-box: string = "",
        extended-address: string = "",
        street-address: string = "",
        locality: string = "",
        region: string = "",
        postal-code: string = "",
        country-name: string = ""
    )
    {
        this.post-office-box = post-office-box;
        this.extended-address = extended-address;
        this.street-address = street-address;
        this.locality = locality;
        this.region = region;
        this.postal-code = postal-code;
        this.country-name = country-name;
    }

    public set post-office-box(post-office-box: string)
    {
        this._post-office-box = post-office-box;
    }

    public get post-office-box(): string
    {
        return this._post-office-box;
    }

    public set extended-address(extended-address: string)
    {
        this._extended-address = extended-address;
    }

    public get extended-address(): string
    {
        return this._extended-address;
    }

    public set street-address(street-address: string)
    {
        this._street-address = street-address;
    }

    public get street-address(): string
    {
        return this._street-address;
    }

    public set locality(locality: string)
    {
        this._locality = locality;
    }

    public get locality(): string
    {
        return this._locality;
    }

    public set region(region: string)
    {
        this._region = region;
    }

    public get region(): string
    {
        return this._region;
    }

    public set postal-code(postal-code: string)
    {
        this._postal-code = postal-code;
    }

    public get postal-code(): string
    {
        return this._postal-code;
    }

    public set country-name(country-name: string)
    {
        this._country-name = country-name;
    }

    public get country-name(): string
    {
        return this._country-name;
    }
}
