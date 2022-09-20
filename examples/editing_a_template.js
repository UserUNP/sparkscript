const df = require("../").default;

const raw = "H4sIAAAAAAAAA42PzQrCQAyEX6Xm3INe9wlEUATxJEViN9TidiO78Y+y72627UVE8BQy82WG9HByXF8imEMPrQUz7lBO0wDdyYvuGBqlFBLqMl4l1Wpp2Su04tZDKn9EXB2+KBwn+juqh+hYwMzLQRqsnCPPXGxRMEseO1JxSc5x8eDg7AxSyqXj9eKf64akCIQuX358sCNv1xQjNgSpUuMmZw5q7COF/WarUVOEUJRCi/QrUfYNzSEnKUIBAAA=";

// pirate the template, lol
const template = df.from(raw, (e, s) => {
  s.author = "UserUNP";
  s.name = "Example Template";
});

const code = template.export();

console.log(code.compressed);
