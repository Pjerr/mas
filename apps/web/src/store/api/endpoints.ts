import { api } from '../api';
export const addTagTypes = [
    'Attributes',
    'Options',
    'Parts',
    'Categories',
    'Group',
    'Manufacturer',
] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getHelloApp: build.query<GetHelloAppApiResponse, GetHelloAppApiArg>(
                {
                    query: () => ({ url: `/` }),
                }
            ),
            createAttribute: build.mutation<
                CreateAttributeApiResponse,
                CreateAttributeApiArg
            >({
                query: (queryArg) => ({
                    url: `/attributes`,
                    method: 'POST',
                    body: queryArg.createAttribute,
                }),
                invalidatesTags: ['Attributes'],
            }),
            findAttribute: build.query<
                FindAttributeApiResponse,
                FindAttributeApiArg
            >({
                query: (queryArg) => ({
                    url: `/attributes`,
                    params: { query: queryArg.query },
                }),
                providesTags: ['Attributes'],
            }),
            removeManyAttribute: build.mutation<
                RemoveManyAttributeApiResponse,
                RemoveManyAttributeApiArg
            >({
                query: (queryArg) => ({
                    url: `/attributes`,
                    method: 'DELETE',
                    params: { ids: queryArg.ids },
                }),
                invalidatesTags: ['Attributes'],
            }),
            findOneAttribute: build.query<
                FindOneAttributeApiResponse,
                FindOneAttributeApiArg
            >({
                query: (queryArg) => ({ url: `/attributes/${queryArg.id}` }),
                providesTags: ['Attributes'],
            }),
            updateAttribute: build.mutation<
                UpdateAttributeApiResponse,
                UpdateAttributeApiArg
            >({
                query: (queryArg) => ({
                    url: `/attributes/${queryArg.id}`,
                    method: 'PATCH',
                    body: queryArg.updateAttribute,
                }),
                invalidatesTags: ['Attributes'],
            }),
            findByProductAttribute: build.query<
                FindByProductAttributeApiResponse,
                FindByProductAttributeApiArg
            >({
                query: (queryArg) => ({
                    url: `/attributes/${queryArg.id}/product`,
                }),
                providesTags: ['Attributes'],
            }),
            createOption: build.mutation<
                CreateOptionApiResponse,
                CreateOptionApiArg
            >({
                query: (queryArg) => ({
                    url: `/options`,
                    method: 'POST',
                    body: queryArg.createOption,
                }),
                invalidatesTags: ['Options'],
            }),
            findOption: build.query<FindOptionApiResponse, FindOptionApiArg>({
                query: (queryArg) => ({
                    url: `/options`,
                    params: { query: queryArg.query },
                }),
                providesTags: ['Options'],
            }),
            removeManyOption: build.mutation<
                RemoveManyOptionApiResponse,
                RemoveManyOptionApiArg
            >({
                query: (queryArg) => ({
                    url: `/options`,
                    method: 'DELETE',
                    params: { ids: queryArg.ids },
                }),
                invalidatesTags: ['Options'],
            }),
            findOneConfigOption: build.query<
                FindOneConfigOptionApiResponse,
                FindOneConfigOptionApiArg
            >({
                query: (queryArg) => ({
                    url: `/options/${queryArg.id}/config`,
                }),
                providesTags: ['Options'],
            }),
            findPartOption: build.query<
                FindPartOptionApiResponse,
                FindPartOptionApiArg
            >({
                query: (queryArg) => ({
                    url: `/options/config`,
                    params: {
                        attributeId: queryArg.attributeId,
                        partId: queryArg.partId,
                    },
                }),
                providesTags: ['Options'],
            }),
            removeOption: build.mutation<
                RemoveOptionApiResponse,
                RemoveOptionApiArg
            >({
                query: (queryArg) => ({
                    url: `/options/${queryArg.id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Options'],
            }),
            createPart: build.mutation<CreatePartApiResponse, CreatePartApiArg>(
                {
                    query: (queryArg) => ({
                        url: `/parts`,
                        method: 'POST',
                        body: queryArg.createPart,
                    }),
                    invalidatesTags: ['Parts'],
                }
            ),
            findPart: build.query<FindPartApiResponse, FindPartApiArg>({
                query: (queryArg) => ({
                    url: `/parts`,
                    params: { query: queryArg.query },
                }),
                providesTags: ['Parts'],
            }),
            removeManyPart: build.mutation<
                RemoveManyPartApiResponse,
                RemoveManyPartApiArg
            >({
                query: (queryArg) => ({
                    url: `/parts`,
                    method: 'DELETE',
                    params: { ids: queryArg.ids },
                }),
                invalidatesTags: ['Parts'],
            }),
            createDraftPart: build.mutation<
                CreateDraftPartApiResponse,
                CreateDraftPartApiArg
            >({
                query: () => ({ url: `/parts/draft`, method: 'POST' }),
                invalidatesTags: ['Parts'],
            }),
            findOnePart: build.query<FindOnePartApiResponse, FindOnePartApiArg>(
                {
                    query: (queryArg) => ({ url: `/parts/${queryArg.id}` }),
                    providesTags: ['Parts'],
                }
            ),
            updatePart: build.mutation<UpdatePartApiResponse, UpdatePartApiArg>(
                {
                    query: (queryArg) => ({
                        url: `/parts/${queryArg.id}`,
                        method: 'PATCH',
                        body: queryArg.updatePart,
                    }),
                    invalidatesTags: ['Parts'],
                }
            ),
            removePart: build.mutation<RemovePartApiResponse, RemovePartApiArg>(
                {
                    query: (queryArg) => ({
                        url: `/parts/${queryArg.id}`,
                        method: 'DELETE',
                    }),
                    invalidatesTags: ['Parts'],
                }
            ),
            bulkUpdatePricePart: build.mutation<
                BulkUpdatePricePartApiResponse,
                BulkUpdatePricePartApiArg
            >({
                query: (queryArg) => ({
                    url: `/parts/bulk-update`,
                    method: 'PATCH',
                    body: queryArg.bulkUpdatePrice,
                    params: { ids: queryArg.ids },
                }),
                invalidatesTags: ['Parts'],
            }),
            addCategoryPart: build.mutation<
                AddCategoryPartApiResponse,
                AddCategoryPartApiArg
            >({
                query: (queryArg) => ({
                    url: `/parts/${queryArg.id}/relationships/category`,
                    method: 'PATCH',
                    body: queryArg.updateCategoryRelation,
                }),
                invalidatesTags: ['Parts'],
            }),
            addAttributePart: build.mutation<
                AddAttributePartApiResponse,
                AddAttributePartApiArg
            >({
                query: (queryArg) => ({
                    url: `/parts/${queryArg.id}/relationships/attribute`,
                    method: 'PATCH',
                    body: queryArg.updateAttributeRelation,
                }),
                invalidatesTags: ['Parts'],
            }),
            removeAttributePart: build.mutation<
                RemoveAttributePartApiResponse,
                RemoveAttributePartApiArg
            >({
                query: (queryArg) => ({
                    url: `/parts/${queryArg.id}/relationships/attribute`,
                    method: 'DELETE',
                    body: queryArg.updateAttributeRelation,
                }),
                invalidatesTags: ['Parts'],
            }),
            removeAttributesPart: build.mutation<
                RemoveAttributesPartApiResponse,
                RemoveAttributesPartApiArg
            >({
                query: (queryArg) => ({
                    url: `/parts/${queryArg.id}/relationships/attributes`,
                    method: 'DELETE',
                    body: queryArg.updateAttributeRelations,
                }),
                invalidatesTags: ['Parts'],
            }),
            createCategory: build.mutation<
                CreateCategoryApiResponse,
                CreateCategoryApiArg
            >({
                query: (queryArg) => ({
                    url: `/categories`,
                    method: 'POST',
                    body: queryArg.createCategory,
                }),
                invalidatesTags: ['Categories'],
            }),
            findCategory: build.query<
                FindCategoryApiResponse,
                FindCategoryApiArg
            >({
                query: (queryArg) => ({
                    url: `/categories`,
                    params: { query: queryArg.query },
                }),
                providesTags: ['Categories'],
            }),
            findOneCategory: build.query<
                FindOneCategoryApiResponse,
                FindOneCategoryApiArg
            >({
                query: (queryArg) => ({ url: `/categories/${queryArg.id}` }),
                providesTags: ['Categories'],
            }),
            updateCategory: build.mutation<
                UpdateCategoryApiResponse,
                UpdateCategoryApiArg
            >({
                query: (queryArg) => ({
                    url: `/categories/${queryArg.id}`,
                    method: 'PATCH',
                    body: queryArg.updateCategory,
                }),
                invalidatesTags: ['Categories'],
            }),
            removeCategory: build.mutation<
                RemoveCategoryApiResponse,
                RemoveCategoryApiArg
            >({
                query: (queryArg) => ({
                    url: `/categories/${queryArg.id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Categories'],
            }),
            updateRelationCategory: build.mutation<
                UpdateRelationCategoryApiResponse,
                UpdateRelationCategoryApiArg
            >({
                query: (queryArg) => ({
                    url: `/categories/${queryArg.id}/relathionships/category`,
                    method: 'PATCH',
                    body: queryArg.updateRelation,
                }),
                invalidatesTags: ['Categories'],
            }),
            createGroup: build.mutation<
                CreateGroupApiResponse,
                CreateGroupApiArg
            >({
                query: (queryArg) => ({
                    url: `/group`,
                    method: 'POST',
                    body: queryArg.createGroup,
                }),
                invalidatesTags: ['Group'],
            }),
            findGroup: build.query<FindGroupApiResponse, FindGroupApiArg>({
                query: (queryArg) => ({
                    url: `/group`,
                    params: { query: queryArg.query },
                }),
                providesTags: ['Group'],
            }),
            findOneGroup: build.query<
                FindOneGroupApiResponse,
                FindOneGroupApiArg
            >({
                query: (queryArg) => ({ url: `/group/${queryArg.id}` }),
                providesTags: ['Group'],
            }),
            updateGroup: build.mutation<
                UpdateGroupApiResponse,
                UpdateGroupApiArg
            >({
                query: (queryArg) => ({
                    url: `/group/${queryArg.id}`,
                    method: 'PATCH',
                    body: queryArg.updateGroup,
                }),
                invalidatesTags: ['Group'],
            }),
            removeGroup: build.mutation<
                RemoveGroupApiResponse,
                RemoveGroupApiArg
            >({
                query: (queryArg) => ({
                    url: `/group/${queryArg.id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Group'],
            }),
            createManufacturer: build.mutation<
                CreateManufacturerApiResponse,
                CreateManufacturerApiArg
            >({
                query: (queryArg) => ({
                    url: `/manufacturer`,
                    method: 'POST',
                    body: queryArg.createManufacturer,
                }),
                invalidatesTags: ['Manufacturer'],
            }),
            findManufacturer: build.query<
                FindManufacturerApiResponse,
                FindManufacturerApiArg
            >({
                query: (queryArg) => ({
                    url: `/manufacturer`,
                    params: { query: queryArg.query },
                }),
                providesTags: ['Manufacturer'],
            }),
            removeManyManufacturer: build.mutation<
                RemoveManyManufacturerApiResponse,
                RemoveManyManufacturerApiArg
            >({
                query: (queryArg) => ({
                    url: `/manufacturer`,
                    method: 'DELETE',
                    params: { ids: queryArg.ids },
                }),
                invalidatesTags: ['Manufacturer'],
            }),
            findOneManufacturer: build.query<
                FindOneManufacturerApiResponse,
                FindOneManufacturerApiArg
            >({
                query: (queryArg) => ({ url: `/manufacturer/${queryArg.id}` }),
                providesTags: ['Manufacturer'],
            }),
            updateManufacturer: build.mutation<
                UpdateManufacturerApiResponse,
                UpdateManufacturerApiArg
            >({
                query: (queryArg) => ({
                    url: `/manufacturer/${queryArg.id}`,
                    method: 'PATCH',
                    body: queryArg.updateManufacturer,
                }),
                invalidatesTags: ['Manufacturer'],
            }),
            removeManufacturer: build.mutation<
                RemoveManufacturerApiResponse,
                RemoveManufacturerApiArg
            >({
                query: (queryArg) => ({
                    url: `/manufacturer/${queryArg.id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Manufacturer'],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as MasApi };
export type GetHelloAppApiResponse = /** status 200  */ string;
export type GetHelloAppApiArg = void;
export type CreateAttributeApiResponse = /** status 201  */ AttributeResponse;
export type CreateAttributeApiArg = {
    createAttribute: CreateAttribute;
};
export type FindAttributeApiResponse = /** status 200  */ AttributesResponse;
export type FindAttributeApiArg = {
    query?: QueryAttribute;
};
export type RemoveManyAttributeApiResponse = unknown;
export type RemoveManyAttributeApiArg = {
    ids: string[];
};
export type FindOneAttributeApiResponse = /** status 200  */ AttributeResponse;
export type FindOneAttributeApiArg = {
    id: string;
};
export type UpdateAttributeApiResponse = /** status 200  */ AttributeResponse;
export type UpdateAttributeApiArg = {
    id: string;
    updateAttribute: UpdateAttribute;
};
export type FindByProductAttributeApiResponse =
    /** status 200  */ PartialAttributesResponse;
export type FindByProductAttributeApiArg = {
    id: string;
};
export type CreateOptionApiResponse = /** status 201  */ OptionResponse;
export type CreateOptionApiArg = {
    createOption: CreateOption;
};
export type FindOptionApiResponse = /** status 200  */ OptionsResponse;
export type FindOptionApiArg = {
    query?: QueryOption;
};
export type RemoveManyOptionApiResponse = unknown;
export type RemoveManyOptionApiArg = {
    ids: string[];
};
export type FindOneConfigOptionApiResponse = /** status 200  */ OptionConfig;
export type FindOneConfigOptionApiArg = {
    id: string;
};
export type FindPartOptionApiResponse = /** status 200  */ OptionsResponse;
export type FindPartOptionApiArg = {
    attributeId: string;
    partId: string;
};
export type RemoveOptionApiResponse = unknown;
export type RemoveOptionApiArg = {
    id: string;
};
export type CreatePartApiResponse = /** status 201  */ PartResponse;
export type CreatePartApiArg = {
    createPart: CreatePart;
};
export type FindPartApiResponse = /** status 200  */ PartsResponse;
export type FindPartApiArg = {
    query?: QueryPart;
};
export type RemoveManyPartApiResponse = unknown;
export type RemoveManyPartApiArg = {
    ids: string[];
};
export type CreateDraftPartApiResponse = /** status 201  */ PartResponse;
export type CreateDraftPartApiArg = void;
export type FindOnePartApiResponse = /** status 200  */ PartResponse;
export type FindOnePartApiArg = {
    id: string;
};
export type UpdatePartApiResponse = /** status 200  */ PartResponse;
export type UpdatePartApiArg = {
    id: string;
    updatePart: UpdatePart;
};
export type RemovePartApiResponse = unknown;
export type RemovePartApiArg = {
    id: string;
};
export type BulkUpdatePricePartApiResponse = /** status 200  */ PartsResponse;
export type BulkUpdatePricePartApiArg = {
    ids: string[];
    bulkUpdatePrice: BulkUpdatePrice;
};
export type AddCategoryPartApiResponse = /** status 200  */ PartResponse;
export type AddCategoryPartApiArg = {
    id: string;
    updateCategoryRelation: UpdateCategoryRelation;
};
export type AddAttributePartApiResponse = /** status 200  */ PartResponse;
export type AddAttributePartApiArg = {
    id: string;
    updateAttributeRelation: UpdateAttributeRelation;
};
export type RemoveAttributePartApiResponse = /** status 200  */ PartResponse;
export type RemoveAttributePartApiArg = {
    id: string;
    updateAttributeRelation: UpdateAttributeRelation;
};
export type RemoveAttributesPartApiResponse = /** status 200  */ PartResponse;
export type RemoveAttributesPartApiArg = {
    id: string;
    updateAttributeRelations: UpdateAttributeRelations;
};
export type CreateCategoryApiResponse = /** status 201  */ CategoryResponse;
export type CreateCategoryApiArg = {
    createCategory: CreateCategory;
};
export type FindCategoryApiResponse = /** status 200  */ CategoriesResponse;
export type FindCategoryApiArg = {
    query?: QueryCategory;
};
export type FindOneCategoryApiResponse = /** status 200  */ CategoryResponse;
export type FindOneCategoryApiArg = {
    id: string;
};
export type UpdateCategoryApiResponse = /** status 200  */ CategoryResponse;
export type UpdateCategoryApiArg = {
    id: string;
    updateCategory: UpdateCategory;
};
export type RemoveCategoryApiResponse = unknown;
export type RemoveCategoryApiArg = {
    id: string;
};
export type UpdateRelationCategoryApiResponse =
    /** status 200  */ CategoryResponse;
export type UpdateRelationCategoryApiArg = {
    id: string;
    updateRelation: UpdateRelation;
};
export type CreateGroupApiResponse = /** status 201  */ GroupResponse;
export type CreateGroupApiArg = {
    createGroup: CreateGroup;
};
export type FindGroupApiResponse = /** status 200  */ GroupsResponse;
export type FindGroupApiArg = {
    query?: QueryGroup;
};
export type FindOneGroupApiResponse = /** status 200  */ GroupResponse;
export type FindOneGroupApiArg = {
    id: string;
};
export type UpdateGroupApiResponse = /** status 200  */ GroupResponse;
export type UpdateGroupApiArg = {
    id: string;
    updateGroup: UpdateGroup;
};
export type RemoveGroupApiResponse = unknown;
export type RemoveGroupApiArg = {
    id: string;
};
export type CreateManufacturerApiResponse =
    /** status 201  */ ManufacturerResponse;
export type CreateManufacturerApiArg = {
    createManufacturer: CreateManufacturer;
};
export type FindManufacturerApiResponse =
    /** status 200  */ ManufacturersResponse;
export type FindManufacturerApiArg = {
    query?: QueryManufacturer;
};
export type RemoveManyManufacturerApiResponse = unknown;
export type RemoveManyManufacturerApiArg = {
    ids: string[];
};
export type FindOneManufacturerApiResponse =
    /** status 200  */ ManufacturerResponse;
export type FindOneManufacturerApiArg = {
    id: string;
};
export type UpdateManufacturerApiResponse =
    /** status 200  */ ManufacturerResponse;
export type UpdateManufacturerApiArg = {
    id: string;
    updateManufacturer: UpdateManufacturer;
};
export type RemoveManufacturerApiResponse = unknown;
export type RemoveManufacturerApiArg = {
    id: string;
};
export type Part = {
    attributes: Attribute[];
    variants: Variant[];
    configs: OptionConfig[];
    id: string;
    name: string;
    status: 'in-stock' | 'out-of-stock';
    searchIndex: string;
    properties: object;
    manufacturer: string;
    category: string;
    basePrice: number;
    createdAt: string;
    updatedAt: string;
    publishStatus: 'published' | 'draft';
};
export type Variant = {
    optionsConfigs: OptionConfig[];
    price: number;
    id: string;
    part: Part;
    createdAt: string;
    updatedAt: string;
};
export type OptionConfig = {
    variants: Variant[];
    id: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    option: AttributeOption;
    part: string;
};
export type AttributeOption = {
    configs: OptionConfig[];
    id: string;
    value: string;
    displayName: string;
    attribute: string;
    createdAt: string;
    updatedAt: string;
};
export type Group = {
    attributes: Attribute[];
    id: string;
    name: string;
    searchIndex: string;
    createdAt: string;
    updatedAt: string;
};
export type AdditionalMetadata = {};
export type Attribute = {
    options: AttributeOption[];
    parts: Part[];
    id: string;
    propertyKey: string;
    displayName: string;
    searchIndex: string;
    editorType:
        | 'checkbox'
        | 'text-input'
        | 'number-input'
        | 'select'
        | 'datetime'
        | 'multiple-select'
        | 'image'
        | 'options'
        | 'button';
    editorValidation:
        | 'none'
        | 'decimal-number'
        | 'integer-number'
        | 'email'
        | 'url'
        | 'letters'
        | 'a-z_0-9'
        | 'array'
        | 'select';
    group: Group;
    createdAt: string;
    updatedAt: string;
    additionalMetadata?: AdditionalMetadata;
};
export type AttributeResponse = {
    data: Attribute;
    links?: string[];
};
export type CreateAttribute = {
    propertyKey?: string;
    displayName: string;
    groupId: string;
    editorType:
        | 'checkbox'
        | 'text-input'
        | 'number-input'
        | 'select'
        | 'datetime'
        | 'multiple-select'
        | 'image'
        | 'options'
        | 'button';
    editorValidation:
        | 'none'
        | 'decimal-number'
        | 'integer-number'
        | 'email'
        | 'url'
        | 'letters'
        | 'a-z_0-9'
        | 'array'
        | 'select';
    additionalMetadata?: AdditionalMetadata;
};
export type AttributesResponse = {
    data: Attribute[];
    links?: string[];
};
export type Filter = {
    field: string;
    value: object;
    operator:
        | '$eq'
        | '$ne'
        | '$gt'
        | '$lt'
        | '$and'
        | '$or'
        | '$like'
        | '$contains'
        | '$contained'
        | '$fulltext'
        | '$in'
        | '$nin';
};
export type Sort = {
    field?: string;
    order?: 'ASC' | 'DESC';
};
export type QueryAttribute = {
    include?: string[];
    filters?: Filter[];
    sort?: Sort;
};
export type UpdateAttribute = {
    propertyKey?: string;
    displayName?: string;
    groupId?: string;
    editorType?:
        | 'checkbox'
        | 'text-input'
        | 'number-input'
        | 'select'
        | 'datetime'
        | 'multiple-select'
        | 'image'
        | 'options'
        | 'button';
    editorValidation?:
        | 'none'
        | 'decimal-number'
        | 'integer-number'
        | 'email'
        | 'url'
        | 'letters'
        | 'a-z_0-9'
        | 'array'
        | 'select';
    additionalMetadata?: AdditionalMetadata;
};
export type AttributeByPart = {
    id: string;
    propertyKey: string;
    displayName: string;
};
export type PartialAttributesResponse = {
    data: AttributeByPart[];
    links?: string[];
};
export type OptionResponse = {
    data: AttributeOption;
    links?: string[];
};
export type CreateOption = {
    value: string;
    displayName: string;
    attributeId: string;
    price: number;
};
export type OptionsResponse = {
    data: AttributeOption[];
    links?: string[];
};
export type QueryOption = {
    include?: string[];
    filters?: Filter[];
    sort?: Sort;
};
export type PartResponse = {
    data: Part;
    links?: string[];
};
export type CreateConfig = {
    price?: number;
    option: string;
};
export type CreatePart = {
    status?: 'in-stock' | 'out-of-stock';
    name: string;
    manufacturerId?: string;
    categoryId?: string;
    attributeIds?: string[];
    properties?: object;
    basePrice: number;
    attributeConfigs: CreateConfig[][];
};
export type PartsResponse = {
    data: Part[];
    links?: string[];
};
export type QueryPart = {
    include?: string[];
    filters?: Filter[];
    sort?: Sort;
};
export type UpdatePart = {};
export type BulkUpdatePrice = {
    payloads: number[];
};
export type UpdateCategoryRelation = {
    categoryId: string;
};
export type UpdateAttributeRelation = {
    attributeId: string;
};
export type UpdateAttributeRelations = {
    attributeIds: string[];
};
export type Category = {
    childrenIds: string[];
    id: string;
    name: string;
    searchIndex: string;
    parentId: string;
    createdAt: string;
    updatedAt: string;
};
export type CategoryResponse = {
    data: Category;
    links?: string[];
};
export type CreateCategory = {
    name: string;
    parentId?: string;
    childrenIds?: string[];
};
export type CategoriesResponse = {
    data: Category[];
    links?: string[];
};
export type QueryCategory = {
    include?: string[];
    filters?: Filter[];
    sort?: Sort;
};
export type UpdateCategory = {};
export type UpdateRelation = {
    parentId?: string;
    childrenIds?: string[];
};
export type GroupResponse = {
    data: Group;
    links?: string[];
};
export type CreateGroup = {
    name: string;
};
export type GroupsResponse = {
    data: Group[];
    links?: string[];
};
export type QueryGroup = {
    include?: string[];
    filters?: Filter[];
    sort?: Sort;
};
export type UpdateGroup = {};
export type Manufacturer = {
    id: string;
    name: string;
    searchIndex: string;
    parts: object;
    createdAt: string;
    updatedAt: string;
};
export type ManufacturerResponse = {
    data: Manufacturer;
    links?: string[];
};
export type CreateManufacturer = {
    name: string;
};
export type ManufacturersResponse = {
    data: Manufacturer[];
    links?: string[];
};
export type QueryManufacturer = {
    include?: string[];
    filters?: Filter[];
    sort?: Sort;
};
export type UpdateManufacturer = {};
export const {
    useGetHelloAppQuery,
    useCreateAttributeMutation,
    useFindAttributeQuery,
    useRemoveManyAttributeMutation,
    useFindOneAttributeQuery,
    useUpdateAttributeMutation,
    useFindByProductAttributeQuery,
    useCreateOptionMutation,
    useFindOptionQuery,
    useRemoveManyOptionMutation,
    useFindOneConfigOptionQuery,
    useFindPartOptionQuery,
    useRemoveOptionMutation,
    useCreatePartMutation,
    useFindPartQuery,
    useRemoveManyPartMutation,
    useCreateDraftPartMutation,
    useFindOnePartQuery,
    useUpdatePartMutation,
    useRemovePartMutation,
    useBulkUpdatePricePartMutation,
    useAddCategoryPartMutation,
    useAddAttributePartMutation,
    useRemoveAttributePartMutation,
    useRemoveAttributesPartMutation,
    useCreateCategoryMutation,
    useFindCategoryQuery,
    useFindOneCategoryQuery,
    useUpdateCategoryMutation,
    useRemoveCategoryMutation,
    useUpdateRelationCategoryMutation,
    useCreateGroupMutation,
    useFindGroupQuery,
    useFindOneGroupQuery,
    useUpdateGroupMutation,
    useRemoveGroupMutation,
    useCreateManufacturerMutation,
    useFindManufacturerQuery,
    useRemoveManyManufacturerMutation,
    useFindOneManufacturerQuery,
    useUpdateManufacturerMutation,
    useRemoveManufacturerMutation,
} = injectedRtkApi;
