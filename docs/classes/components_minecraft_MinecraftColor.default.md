[sparkscript](../README.md) / [Exports](../modules.md) / [components/minecraft/MinecraftColor](../modules/components_minecraft_MinecraftColor.md) / default

# Class: default

[components/minecraft/MinecraftColor](../modules/components_minecraft_MinecraftColor.md).default

## Table of contents

### Constructors

- [constructor](components_minecraft_MinecraftColor.default.md#constructor)

### Properties

- [blue](components_minecraft_MinecraftColor.default.md#blue)
- [green](components_minecraft_MinecraftColor.default.md#green)
- [red](components_minecraft_MinecraftColor.default.md#red)
- [colorMap](components_minecraft_MinecraftColor.default.md#colormap)
- [colors](components_minecraft_MinecraftColor.default.md#colors)

### Methods

- [toCode](components_minecraft_MinecraftColor.default.md#tocode)
- [toString](components_minecraft_MinecraftColor.default.md#tostring)
- [from](components_minecraft_MinecraftColor.default.md#from)
- [fromCode](components_minecraft_MinecraftColor.default.md#fromcode)
- [fromHex](components_minecraft_MinecraftColor.default.md#fromhex)

## Constructors

### constructor

• **new default**(...`values`)

Returns a new MinecraftColor with the given RGB values.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `number`[] |

#### Defined in

[components/minecraft/MinecraftColor.ts:86](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L86)

## Properties

### blue

• **blue**: `number`

#### Defined in

[components/minecraft/MinecraftColor.ts:93](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L93)

___

### green

• **green**: `number`

#### Defined in

[components/minecraft/MinecraftColor.ts:93](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L93)

___

### red

• **red**: `number`

#### Defined in

[components/minecraft/MinecraftColor.ts:93](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L93)

___

### colorMap

▪ `Static` `Readonly` **colorMap**: `Object`

Object containing the Minecraft color codes and their corresponding names.

#### Index signature

▪ [code: `string`]: `string`

#### Defined in

[components/minecraft/MinecraftColor.ts:28](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L28)

___

### colors

▪ `Static` `Readonly` **colors**: `Object`

Object containing the Minecraft color codes and their corresponding hex values.

#### Index signature

▪ [name: `string`]: [`string`, `string`, `string`]

#### Defined in

[components/minecraft/MinecraftColor.ts:6](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L6)

## Methods

### toCode

▸ **toCode**(): `string`

Turn into the vanilla Minecraft color code if applicable.

#### Returns

`string`

The minecraft color code for the color.

#### Defined in

[components/minecraft/MinecraftColor.ts:125](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L125)

___

### toString

▸ **toString**(`papermc?`): `string`

Stringify the color into a readable format.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `papermc` | `boolean` | `false` | PaperMC compatible string. |

#### Returns

`string`

Hex string representation of the color.

#### Defined in

[components/minecraft/MinecraftColor.ts:104](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L104)

___

### from

▸ `Static` **from**(`hexOrCode`): [`default`](components_minecraft_MinecraftColor.default.md)

Turn vanilla Minecraft color code into a MinecraftColor object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hexOrCode` | `string` | Hex string or Minecraft color code. |

#### Returns

[`default`](components_minecraft_MinecraftColor.default.md)

A new MinecraftColor.

#### Defined in

[components/minecraft/MinecraftColor.ts:81](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L81)

___

### fromCode

▸ `Static` **fromCode**(`code`): [`default`](components_minecraft_MinecraftColor.default.md)

Returns a new MinecraftColor with the given color code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | Minecraft color code. |

#### Returns

[`default`](components_minecraft_MinecraftColor.default.md)

A new MinecraftColor.

#### Defined in

[components/minecraft/MinecraftColor.ts:53](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L53)

___

### fromHex

▸ `Static` **fromHex**(`hex`): [`default`](components_minecraft_MinecraftColor.default.md)

Returns a new MinecraftColor from the given hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | Hex string representation of the color. |

#### Returns

[`default`](components_minecraft_MinecraftColor.default.md)

A new MinecraftColor.

#### Defined in

[components/minecraft/MinecraftColor.ts:67](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/minecraft/MinecraftColor.ts#L67)
