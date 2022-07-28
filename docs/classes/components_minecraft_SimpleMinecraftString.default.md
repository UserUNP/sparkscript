[sparkscript](../README.md) / [Exports](../modules.md) / [components/minecraft/SimpleMinecraftString](../modules/components_minecraft_SimpleMinecraftString.md) / default

# Class: default

[components/minecraft/SimpleMinecraftString](../modules/components_minecraft_SimpleMinecraftString.md).default

## Table of contents

### Constructors

- [constructor](components_minecraft_SimpleMinecraftString.default.md#constructor)

### Properties

- [bold](components_minecraft_SimpleMinecraftString.default.md#bold)
- [color](components_minecraft_SimpleMinecraftString.default.md#color)
- [italic](components_minecraft_SimpleMinecraftString.default.md#italic)
- [obfuscated](components_minecraft_SimpleMinecraftString.default.md#obfuscated)
- [strikethrough](components_minecraft_SimpleMinecraftString.default.md#strikethrough)
- [text](components_minecraft_SimpleMinecraftString.default.md#text)
- [underlined](components_minecraft_SimpleMinecraftString.default.md#underlined)

### Methods

- [export](components_minecraft_SimpleMinecraftString.default.md#export)
- [toString](components_minecraft_SimpleMinecraftString.default.md#tostring)
- [from](components_minecraft_SimpleMinecraftString.default.md#from)

## Constructors

### constructor

• **new default**(`text`, `options?`)

Construct a Minecraft string with basic formatting & options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text to format. |
| `options` | `options` | The options to apply to the string. |

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:38](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L38)

## Properties

### bold

• **bold**: `boolean`

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L25)

___

### color

• **color**: [`default`](components_minecraft_MinecraftColor.default.md)

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:30](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L30)

___

### italic

• **italic**: `boolean`

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:26](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L26)

___

### obfuscated

• **obfuscated**: `boolean`

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:29](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L29)

___

### strikethrough

• **strikethrough**: `boolean`

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:28](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L28)

___

### text

• **text**: `string`

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:38](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L38)

___

### underlined

• **underlined**: `boolean`

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:27](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L27)

## Methods

### export

▸ **export**(`nbt?`): [`serializedSimpleMCString`](../interfaces/components_minecraft_SimpleMinecraftString.serializedSimpleMCString.md)

Export the Minecraft string as a JSON object.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `nbt` | `boolean` | `false` |

#### Returns

[`serializedSimpleMCString`](../interfaces/components_minecraft_SimpleMinecraftString.serializedSimpleMCString.md)

The serialized version of this string.

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:51](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L51)

___

### toString

▸ **toString**(`altCode?`): `string`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `altCode` | `string` | `"&"` | An alternate code symbol to use. |

#### Returns

`string`

Vanilla Minecraft text with the given formatting.

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:68](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L68)

___

### from

▸ `Static` **from**(`obj`): [`default`](components_minecraft_SimpleMinecraftString.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`serializedSimpleMCString`](../interfaces/components_minecraft_SimpleMinecraftString.serializedSimpleMCString.md) |

#### Returns

[`default`](components_minecraft_SimpleMinecraftString.default.md)

#### Defined in

[components/minecraft/SimpleMinecraftString.ts:79](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/SimpleMinecraftString.ts#L79)
