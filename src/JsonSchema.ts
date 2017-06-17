enum SimpleType
{
    "array",
    "boolean",
    "integer",
    "null",
    "number",
    "object",
    "string"
}

export interface JsonSchema
{
    $id: string;
    $schema: string;
    $ref: string;
    title: string;
    description: string;
    default: any;
    multipleOf: number;
    maximum: number;
    exclusiveMaximum: number;
    minimum: number;
    exclusiveMinimum: number;
    maxLength: number;
    minLength: number;
    pattern: string;
    additionalItems: JsonSchema;
    items: JsonSchema|Array<JsonSchema>;
    maxItems: number;
    minItems: number;
    uniqueItems: boolean;
    contains: JsonSchema;
    maxProperties: number;
    minProperties: number;
    required: Array<string>;
    additionalProperties: JsonSchema;
    definitions: {
        additionalProperties: JsonSchema;
    };
    properties: {
        additionalProperties: JsonSchema;
    };
    patternProperties: {
        additionalProperties: JsonSchema;
    };
    dependencies: {
        additionalProperties: JsonSchema|Array<string>;
    };
    propertyNames: JsonSchema;
    const: any;
    enum: Array<any>;
    type: SimpleType|Array<SimpleType>;
    format: string;
    allOf: Array<JsonSchema>;
    anyOf: Array<JsonSchema>;
    oneOf: Array<JsonSchema>;
    not: JsonSchema;
}
