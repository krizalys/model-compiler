class calendar
{
    private _dtstart: string;

    private _dtend: string;

    private _summary: string;

    private _location: string;

    private _url: string;

    private _duration: string;

    private _rdate: string;

    private _rrule: string;

    private _category: string;

    private _description: string;

    private _geo: object;

    public constructor(
        dtstart: string = "",
        dtend: string = "",
        summary: string = "",
        location: string = "",
        url: string = "",
        duration: string = "",
        rdate: string = "",
        rrule: string = "",
        category: string = "",
        description: string = "",
        geo: object = {}
    )
    {
        this.dtstart = dtstart;
        this.dtend = dtend;
        this.summary = summary;
        this.location = location;
        this.url = url;
        this.duration = duration;
        this.rdate = rdate;
        this.rrule = rrule;
        this.category = category;
        this.description = description;
        this.geo = geo;
    }

    public set dtstart(dtstart: string)
    {
        this._dtstart = dtstart;
    }

    public get dtstart(): string
    {
        return this._dtstart;
    }

    public set dtend(dtend: string)
    {
        this._dtend = dtend;
    }

    public get dtend(): string
    {
        return this._dtend;
    }

    public set summary(summary: string)
    {
        this._summary = summary;
    }

    public get summary(): string
    {
        return this._summary;
    }

    public set location(location: string)
    {
        this._location = location;
    }

    public get location(): string
    {
        return this._location;
    }

    public set url(url: string)
    {
        this._url = url;
    }

    public get url(): string
    {
        return this._url;
    }

    public set duration(duration: string)
    {
        this._duration = duration;
    }

    public get duration(): string
    {
        return this._duration;
    }

    public set rdate(rdate: string)
    {
        this._rdate = rdate;
    }

    public get rdate(): string
    {
        return this._rdate;
    }

    public set rrule(rrule: string)
    {
        this._rrule = rrule;
    }

    public get rrule(): string
    {
        return this._rrule;
    }

    public set category(category: string)
    {
        this._category = category;
    }

    public get category(): string
    {
        return this._category;
    }

    public set description(description: string)
    {
        this._description = description;
    }

    public get description(): string
    {
        return this._description;
    }

    public set geo(geo: object)
    {
        this._geo = geo;
    }

    public get geo(): object
    {
        return this._geo;
    }
}
