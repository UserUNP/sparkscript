[sparkscript](../README.md) / [Exports](../modules.md) / [values/Vector](../modules/values_Vector.md) / default

# Class: default

[values/Vector](../modules/values_Vector.md).default

## Hierarchy

- [`default`](components_Value.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](values_Vector.default.md#constructor)

### Properties

- [data](values_Vector.default.md#data)
- [slot](values_Vector.default.md#slot)
- [type](values_Vector.default.md#type)
- [x](values_Vector.default.md#x)
- [y](values_Vector.default.md#y)
- [z](values_Vector.default.md#z)

### Methods

- [export](values_Vector.default.md#export)
- [from](values_Vector.default.md#from)

## Constructors

### constructor

• **new default**(`x`, `y`, `z`, `slot?`)

Create a new vector value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | X coordinate. |
| `y` | `number` | Y coordinate. |
| `z` | `number` | Z coordinate. |
| `slot?` | `number` | - |

#### Overrides

[default](components_Value.default.md).[constructor](components_Value.default.md#constructor)

#### Defined in

[values/Vector.ts:10](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Vector.ts#L10)

## Properties

### data

• **data**: ``null`` \| [`default`](components_DataStorage.default.md) = `null`

#### Inherited from

[default](components_Value.default.md).[data](components_Value.default.md#data)

#### Defined in

[components/Value.ts:17](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L17)

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

___

### x

• **x**: `number`

#### Defined in

[values/Vector.ts:10](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Vector.ts#L10)

___

### y

• **y**: `number`

#### Defined in

[values/Vector.ts:10](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Vector.ts#L10)

___

### z

• **z**: `number`

#### Defined in

[values/Vector.ts:10](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Vector.ts#L10)

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

#### Inherited from

[default](components_Value.default.md).[export](components_Value.default.md#export)

#### Defined in

[components/Value.ts:34](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L34)

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
