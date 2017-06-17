class card
{
    private _fn: string;

    private _familyName: string;

    private _givenName: string;

    private _additionalName: Array<string>;

    private _honorificPrefix: Array<string>;

    private _honorificSuffix: Array<string>;

    private _nickname: string;

    private _url: string;

    private _email: object;

    private _tel: object;

    private _adr: object;

    private _geo: object;

    private _tz: string;

    private _photo: string;

    private _logo: string;

    private _sound: string;

    private _bday: string;

    private _title: string;

    private _role: string;

    private _org: object;

    public constructor(
        fn: string = "",
        familyName: string = "",
        givenName: string = "",
        additionalName: Array<string> = [],
        honorificPrefix: Array<string> = [],
        honorificSuffix: Array<string> = [],
        nickname: string = "",
        url: string = "",
        email: object = {},
        tel: object = {},
        adr: object = {},
        geo: object = {},
        tz: string = "",
        photo: string = "",
        logo: string = "",
        sound: string = "",
        bday: string = "",
        title: string = "",
        role: string = "",
        org: object = {}
    )
    {
        this.fn = fn;
        this.familyName = familyName;
        this.givenName = givenName;
        this.additionalName = additionalName;
        this.honorificPrefix = honorificPrefix;
        this.honorificSuffix = honorificSuffix;
        this.nickname = nickname;
        this.url = url;
        this.email = email;
        this.tel = tel;
        this.adr = adr;
        this.geo = geo;
        this.tz = tz;
        this.photo = photo;
        this.logo = logo;
        this.sound = sound;
        this.bday = bday;
        this.title = title;
        this.role = role;
        this.org = org;
    }

    public set fn(fn: string)
    {
        this._fn = fn;
    }

    public get fn(): string
    {
        return this._fn;
    }

    public set familyName(familyName: string)
    {
        this._familyName = familyName;
    }

    public get familyName(): string
    {
        return this._familyName;
    }

    public set givenName(givenName: string)
    {
        this._givenName = givenName;
    }

    public get givenName(): string
    {
        return this._givenName;
    }

    public set additionalName(additionalName: Array<string>)
    {
        this._additionalName = additionalName;
    }

    public get additionalName(): Array<string>
    {
        return this._additionalName;
    }

    public set honorificPrefix(honorificPrefix: Array<string>)
    {
        this._honorificPrefix = honorificPrefix;
    }

    public get honorificPrefix(): Array<string>
    {
        return this._honorificPrefix;
    }

    public set honorificSuffix(honorificSuffix: Array<string>)
    {
        this._honorificSuffix = honorificSuffix;
    }

    public get honorificSuffix(): Array<string>
    {
        return this._honorificSuffix;
    }

    public set nickname(nickname: string)
    {
        this._nickname = nickname;
    }

    public get nickname(): string
    {
        return this._nickname;
    }

    public set url(url: string)
    {
        this._url = url;
    }

    public get url(): string
    {
        return this._url;
    }

    public set email(email: object)
    {
        this._email = email;
    }

    public get email(): object
    {
        return this._email;
    }

    public set tel(tel: object)
    {
        this._tel = tel;
    }

    public get tel(): object
    {
        return this._tel;
    }

    public set adr(adr: object)
    {
        this._adr = adr;
    }

    public get adr(): object
    {
        return this._adr;
    }

    public set geo(geo: object)
    {
        this._geo = geo;
    }

    public get geo(): object
    {
        return this._geo;
    }

    public set tz(tz: string)
    {
        this._tz = tz;
    }

    public get tz(): string
    {
        return this._tz;
    }

    public set photo(photo: string)
    {
        this._photo = photo;
    }

    public get photo(): string
    {
        return this._photo;
    }

    public set logo(logo: string)
    {
        this._logo = logo;
    }

    public get logo(): string
    {
        return this._logo;
    }

    public set sound(sound: string)
    {
        this._sound = sound;
    }

    public get sound(): string
    {
        return this._sound;
    }

    public set bday(bday: string)
    {
        this._bday = bday;
    }

    public get bday(): string
    {
        return this._bday;
    }

    public set title(title: string)
    {
        this._title = title;
    }

    public get title(): string
    {
        return this._title;
    }

    public set role(role: string)
    {
        this._role = role;
    }

    public get role(): string
    {
        return this._role;
    }

    public set org(org: object)
    {
        this._org = org;
    }

    public get org(): object
    {
        return this._org;
    }
}
