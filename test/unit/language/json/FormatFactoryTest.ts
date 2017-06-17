import {expect}        from "chai";
import {withData}      from "leche";
import {Format}        from "../../../../src/Format";
import {FormatFactory} from "../../../../src/language/json/FormatFactory";

describe("FormatFactory", () =>
    describe("#create()", () =>
        withData({
            "date-time": [
                "date-time",
                Format.DATE_TIME,
            ],

            "email": [
                "email",
                Format.EMAIL,
            ],

            "hostname": [
                "hostname",
                Format.HOSTNAME,
            ],

            "ipv4": [
                "ipv4",
                Format.IPV4,
            ],

            "ipv6": [
                "ipv6",
                Format.IPV6,
            ],

            "uri": [
                "uri",
                Format.URI,
            ],
        }, (format, expected) =>
            it("should return the expected value", () => {
                const sut = new FormatFactory();
                const actual = sut.create(format);
                expect(actual).to.equal(expected);
            })
        )
    )
);
