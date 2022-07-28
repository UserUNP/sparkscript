[sparkscript](../README.md) / [Exports](../modules.md) / [values/MinecraftItem](../modules/values_MinecraftItem.md) / default

# Class: default

[values/MinecraftItem](../modules/values_MinecraftItem.md).default

## Hierarchy

- [`default`](components_Value.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](values_MinecraftItem.default.md#constructor)

### Properties

- [count](values_MinecraftItem.default.md#count)
- [data](values_MinecraftItem.default.md#data)
- [id](values_MinecraftItem.default.md#id)
- [name](values_MinecraftItem.default.md#name)
- [slot](values_MinecraftItem.default.md#slot)
- [type](values_MinecraftItem.default.md#type)

### Methods

- [export](values_MinecraftItem.default.md#export)
- [setTag](values_MinecraftItem.default.md#settag)
- [from](values_MinecraftItem.default.md#from)

## Constructors

### constructor

• **new default**(`count`, `id`, `name`, `slot?`)

Create a Minecraft item value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | Amount of items. |
| `id` | `string` | Item ID name. |
| `name` | `string` \| [`default`](components_minecraft_MinecraftString.default.md) | Item name. |
| `slot?` | `number` | - |

#### Overrides

[default](components_Value.default.md).[constructor](components_Value.default.md#constructor)

#### Defined in

[values/MinecraftItem.ts:13](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/MinecraftItem.ts#L13)

## Properties

### count

• **count**: `number`

#### Defined in

[values/MinecraftItem.ts:13](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/MinecraftItem.ts#L13)

___

### data

• **data**: ``null`` \| [`default`](components_DataStorage.default.md) = `null`

#### Inherited from

[default](components_Value.default.md).[data](components_Value.default.md#data)

#### Defined in

[components/Value.ts:17](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L17)

___

### id

• **id**: `string`

#### Defined in

[values/MinecraftItem.ts:13](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/MinecraftItem.ts#L13)

___

### name

• **name**: `string` \| [`default`](components_minecraft_MinecraftString.default.md)

#### Defined in

[values/MinecraftItem.ts:13](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/MinecraftItem.ts#L13)

___

### slot

• `Optional` **slot**: `number`

#### Inherited from

[default](components_Value.default.md).[slot](components_Value.default.md#slot)

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

___

### type

• **type**: `string`

#### Inherited from

[default](components_Value.default.md).[type](components_Value.default.md#type)

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

## Methods

### export

▸ **export**(`containingBlockArguments`): [`serializedValue`](../interfaces/components_Value.serializedValue.md)

Export the value to a JSON object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `containingBlockArguments` | [`default`](components_Value.default.md)[] |

#### Returns

[`serializedValue`](../interfaces/components_Value.serializedValue.md)

DiamondFire JSON-ified value.

#### Overrides

[default](components_Value.default.md).[export](components_Value.default.md#export)

#### Defined in

[values/MinecraftItem.ts:49](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/MinecraftItem.ts#L49)

___

### setTag

▸ **setTag**(`key`, `value`, `vanillaModify?`): [`default`](values_MinecraftItem.default.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `string` | `undefined` |
| `value` | `string` \| `number` \| `boolean` | `undefined` |
| `vanillaModify` | `boolean` | `false` |

#### Returns

[`default`](values_MinecraftItem.default.md)

#### Defined in

[values/MinecraftItem.ts:29](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/MinecraftItem.ts#L29)

___

### from

▸ `Static` **from**(`raw`): [`default`](components_Value.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | [`serializedValue`](../interfaces/components_Value.serializedValue.md) |

#### Returns

[`default`](components_Value.default.md)

#### Inherited from

[default](components_Value.default.md).[from](components_Value.default.md#from)

#### Defined in

[components/Value.ts:11](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L11)
