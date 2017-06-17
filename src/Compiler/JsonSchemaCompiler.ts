import {Node}        from "../ast/Node";
import {TypeDefiner} from "../language/json/TypeDefiner";

export class JsonSchemaCompiler
{
    public compile(node: Node, name: string): string
    {
        const visitor = new TypeDefiner();
        const schema  = node.types[0].accept(null, visitor);
        return JSON.stringify(schema);
    }
}
