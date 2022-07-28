[sparkscript](../README.md) / [Exports](../modules.md) / [components/minecraft/MinecraftString](../modules/components_minecraft_MinecraftString.md) / default

# Class: default

[components/minecraft/MinecraftString](../modules/components_minecraft_MinecraftString.md).default

## Table of contents

### Constructors

- [constructor](components_minecraft_MinecraftString.default.md#constructor)

### Properties

- [raw](components_minecraft_MinecraftString.default.md#raw)
- [segments](components_minecraft_MinecraftString.default.md#segments)
- [text](components_minecraft_MinecraftString.default.md#text)
- [colorRegex](components_minecraft_MinecraftString.default.md#colorregex)
- [regex](components_minecraft_MinecraftString.default.md#regex)
- [styleMap](components_minecraft_MinecraftString.default.md#stylemap)
- [styleRegex](components_minecraft_MinecraftString.default.md#styleregex)

### Methods

- [export](components_minecraft_MinecraftString.default.md#export)
- [bold](components_minecraft_MinecraftString.default.md#bold)
- [italic](components_minecraft_MinecraftString.default.md#italic)
- [obfuscated](components_minecraft_MinecraftString.default.md#obfuscated)
- [strikethrough](components_minecraft_MinecraftString.default.md#strikethrough)
- [underlined](components_minecraft_MinecraftString.default.md#underlined)

## Constructors

### constructor

• **new default**(`text`)

Construct a Minecraft string from a string of text,
can include color and style codes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to parse. |

#### Defined in

[components/minecraft/MinecraftString.ts:85](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L85)

## Properties

### raw

• **raw**: `string`

#### Defined in

[components/minecraft/MinecraftString.ts:78](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L78)

___

### segments

• **segments**: [`default`](components_minecraft_SimpleMinecraftString.default.md)[] = `[]`

The segments of the Minecraft string.

#### Defined in

[components/minecraft/MinecraftString.ts:76](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L76)

___

### text

• **text**: `string`

#### Defined in

[components/minecraft/MinecraftString.ts:77](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L77)

___

### colorRegex

▪ `Static` `Readonly` **colorRegex**: `RegExp`

#### Defined in

[components/minecraft/MinecraftString.ts:70](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L70)

___

### regex

▪ `Static` `Readonly` **regex**: `RegExp`

Regular expression to match Minecraft color & style codes.

#### Defined in

[components/minecraft/MinecraftString.ts:69](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L69)

___

### styleMap

▪ `Static` `Readonly` **styleMap**: `Object`

Object containing the style codes and their corresponding style.

#### Index signature

▪ [code: `string`]: `string`

#### Defined in

[components/minecraft/MinecraftString.ts:12](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L12)

___

### styleRegex

▪ `Static` `Readonly` **styleRegex**: `RegExp`

#### Defined in

[components/minecraft/MinecraftString.ts:71](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L71)

## Methods

### export

▸ **export**(`nbt?`): [`serializedSimpleMCString`](../interfaces/components_minecraft_SimpleMinecraftString.serializedSimpleMCString.md)[]

Export the Minecraft string to a list of simple Minecraft strings.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `nbt` | `boolean` | `false` |

#### Returns

[`serializedSimpleMCString`](../interfaces/components_minecraft_SimpleMinecraftString.serializedSimpleMCString.md)[]

Vanilla Minecraft text with the given formatting.

#### Defined in

[components/minecraft/MinecraftString.ts:122](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L122)

___

### bold

▸ `Static` **bold**(`text`): [`default`](components_minecraft_SimpleMinecraftString.default.md)

Apply the bold style to the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to bold. |

#### Returns

[`default`](components_minecraft_SimpleMinecraftString.default.md)

A new Minecraft string with bold text.

#### Defined in

[components/minecraft/MinecraftString.ts:35](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L35)

___

### italic

▸ `Static` **italic**(`text`): [`default`](components_minecraft_SimpleMinecraftString.default.md)

Apply the italic style to the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to italicize. |

#### Returns

[`default`](components_minecraft_SimpleMinecraftString.default.md)

A new Minecraft string with italicized text.

#### Defined in

[components/minecraft/MinecraftString.ts:44](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L44)

___

### obfuscated

▸ `Static` **obfuscated**(`text`): [`default`](components_minecraft_SimpleMinecraftString.default.md)

Apply the obfuscated style to the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to obfuscate. |

#### Returns

[`default`](components_minecraft_SimpleMinecraftString.default.md)

A new Minecraft string with obfuscated text.

#### Defined in

[components/minecraft/MinecraftString.ts:26](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L26)

___

### strikethrough

▸ `Static` **strikethrough**(`text`): [`default`](components_minecraft_SimpleMinecraftString.default.md)

Apply the strikethrough style to the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to strikethrough. |

#### Returns

[`default`](components_minecraft_SimpleMinecraftString.default.md)

A new Minecraft string with strikethrough text.

#### Defined in

[components/minecraft/MinecraftString.ts:62](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L62)

___

### underlined

▸ `Static` **underlined**(`text`): [`default`](components_minecraft_SimpleMinecraftString.default.md)

Apply the underline style to the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to underline. |

#### Returns

[`default`](components_minecraft_SimpleMinecraftString.default.md)

A new Minecraft string with underlined text.

#### Defined in

[components/minecraft/MinecraftString.ts:53](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftString.ts#L53)
