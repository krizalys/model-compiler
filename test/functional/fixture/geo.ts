class geo
{
    private _latitude: number;

    private _longitude: number;

    public constructor(
        latitude: number = 0.0,
        longitude: number = 0.0
    )
    {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public set latitude(latitude: number)
    {
        this._latitude = latitude;
    }

    public get latitude(): number
    {
        return this._latitude;
    }

    public set longitude(longitude: number)
    {
        this._longitude = longitude;
    }

    public get longitude(): number
    {
        return this._longitude;
    }
}
