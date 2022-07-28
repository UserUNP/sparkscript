[sparkscript](../README.md) / [Exports](../modules.md) / [values/Location](../modules/values_Location.md) / default

# Class: default

[values/Location](../modules/values_Location.md).default

## Hierarchy

- [`default`](components_Value.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](values_Location.default.md#constructor)

### Properties

- [data](values_Location.default.md#data)
- [pitch](values_Location.default.md#pitch)
- [slot](values_Location.default.md#slot)
- [type](values_Location.default.md#type)
- [x](values_Location.default.md#x)
- [y](values_Location.default.md#y)
- [yaw](values_Location.default.md#yaw)
- [z](values_Location.default.md#z)

### Methods

- [export](values_Location.default.md#export)
- [from](values_Location.default.md#from)

## Constructors

### constructor

• **new default**(`x`, `y`, `z`, `pitch?`, `yaw?`, `slot?`)

Create a new location value.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `number` | `undefined` | X coordinate. |
| `y` | `number` | `undefined` | Y coordinate. |
| `z` | `number` | `undefined` | Z coordinate. |
| `pitch` | `number` | `90` | Pitch, defaults to 0. |
| `yaw` | `number` | `0` | Yaw, defaults to 0. |
| `slot?` | `number` | `undefined` | - |

#### Overrides

[default](components_Value.default.md).[constructor](components_Value.default.md#constructor)

#### Defined in

[values/Location.ts:12](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Location.ts#L12)

## Properties

### data

• **data**: ``null`` \| [`default`](components_DataStorage.default.md) = `null`

#### Inherited from

[default](components_Value.default.md).[data](components_Value.default.md#data)

#### Defined in

[components/Value.ts:17](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L17)

___

### pitch

• **pitch**: `number` = `90`

#### Defined in

[values/Location.ts:12](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Location.ts#L12)

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

[values/Location.ts:12](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Location.ts#L12)

___

### y

• **y**: `number`

#### Defined in

[values/Location.ts:12](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Location.ts#L12)

___

### yaw

• **yaw**: `number` = `0`

#### Defined in

[values/Location.ts:12](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Location.ts#L12)

___

### z

• **z**: `number`

#### Defined in

[values/Location.ts:12](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Location.ts#L12)

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
