class Common
{
    public constructor(
        id:           string                       = null,
        schema:       string                       = null,
        ref:          string                       = null,
        title:        string                       = null,
        description:  string                       = null,
        default_:     any                          = null,
        definitions:  any                          = null,
        dependencies: any                          = null,
        const_:       any                          = null,
        enum_:        Array<any>                   = null,
        type:         SimpleType|Array<SimpleType> = null,
        allOf:        Array<JsonSchema>            = null,
        anyOf:        Array<JsonSchema>            = null,
        oneOf:        Array<JsonSchema>            = null,
        not:          JsonSchema                   = null,
    )
    {
    }
}
