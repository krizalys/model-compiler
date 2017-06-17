export class TypeScriptNameFilter
{
    public filter(name: string): string
    {
        if (name == "enum") {
            return "enum_";
        }

        return name;
    }
}
