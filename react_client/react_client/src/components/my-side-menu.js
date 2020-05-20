import './styles/my-side-menu.css';
import React, {Component} from "react";

import {Button, Input, InputNumber, Layout, Menu, Rate, Select, Slider} from 'antd';
import {gql} from 'apollo-boost';
import {apolloClient, isDemo} from "../common/apollo-client";
import map from "lodash/map";
import isEqual from "lodash/isEqual";
import intersection from "lodash/intersection";
import {
    getDistinctBrands,
    getDistinctTags,
    getProductIdsAndTheirAvgRatings,
    getProductsIdsByBrand,
    getProductsIdsByNameRegex,
    getProductsIdsByTags,
    getProductsIdsInPriceRange
} from "../api/custom-queries";
import {mapGraphQlRawResultToListOfIds} from "../utils/common-utils";
import {ALL} from "../common/definitions";


const {Sider} = Layout;
const {Option} = Select;

const PRICES_QUERY = gql`
      {
  allProducts(orderBy: [CURRENT_PRICE_DESC]) {
    edges {
      node {
        currentPrice
      }
    }
  }
}
    `;

export default class MySideMenu extends Component {
    state = {
        minPriceInShop: 0,
        maxPriceInShop: 100,

        brandsAvailableForSelect: [],
        tagsAvailableForSelect: [],

        priceFrom: 0,
        priceTo: 100,
        minimumRating: 0,
        brand: '',
        tags: [],
        productName: '',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        apolloClient
            .query({query: PRICES_QUERY})
            .then(result => {
                const edges = result.data.allProducts.edges;
                const maxPriceInShop = edges[0].node.currentPrice;
                const minPriceInShop = edges[edges.length - 1].node.currentPrice;

                const minPriceRounded = Math.round(minPriceInShop * 100) / 100;
                const maxPriceRounded = Math.round(maxPriceInShop * 100) / 100;

                this.setState({
                    minPriceInShop: minPriceRounded,
                    maxPriceInShop: maxPriceRounded,
                    priceFrom: minPriceInShop,
                    priceTo: maxPriceInShop,
                });
            }).catch(error => {
            console.error(error)
        });

        getDistinctBrands().then(brandsAvailableForSelect => {
            this.setState({
                brandsAvailableForSelect
            })
        });

        getDistinctTags().then(tagsAvailableForSelect => {
            this.setState({
                tagsAvailableForSelect
            })
        });
    }

    whichFilterApplied = () => {
        const {
            minPriceInShop,
            maxPriceInShop,
            priceFrom,
            priceTo,
            minimumRating,
            brand,
            tags,
            productName,
        } = this.state;

        return {
            priceFrom: (priceFrom - minPriceInShop) != 0,
            priceTo: (priceTo - maxPriceInShop) != 0,
            minimumRating: (minimumRating !== 0),
            brand: (!isEqual(brand, '')),
            tags: (!isEqual(tags, [])),
            productName: (!isEqual(productName, '')),
        };
    };

    resetFilters = () => {
        this.props.setListOfIdsFilter(ALL);
    };

    onChangePriceFrom = value => {
        this.setState({
            priceFrom: value,
        });
    };

    onChangePriceTo = value => {
        this.setState({
            priceTo: value,
        });
    };

    onChangeMinimumRating = value => {
        this.setState({
            minimumRating: value,
        });
    };

    // <Filtering Functions> -----------------
    /**
     * Filtering function returning list of ids fulfilling certain condition
     */
    getIdsFilteredByMinimumAvgRating = () => {
        if (isEqual(this.state.minimumRating, 0)) {
            return ALL;
        } else {
            return getProductIdsAndTheirAvgRatings().then(productIdsAndTheirAvgRatings => {
                return productIdsAndTheirAvgRatings.filter(({id, average}) => {
                    return average > this.state.minimumRating;
                }).map(({id, average}) => {
                    return id
                });
            });
        }
    };

    /**
     * Filtering function returning list of ids fulfilling certain condition
     */
    getIdsFilteredByPriceRange = () => {
        return getProductsIdsInPriceRange(this.state.priceFrom, this.state.priceTo)
            .then(result => {
                return mapGraphQlRawResultToListOfIds(result);
            });
    };

    /**
     * Filtering function returning list of ids fulfilling certain condition
     */
    getIdsFilteredByBrand = () => {
        if (!isEqual(this.state.brand, '')) {
            return getProductsIdsByBrand(this.state.brand)
                .then(result => {
                    return mapGraphQlRawResultToListOfIds(result);
                });
        } else {
            return ALL;
        }
    };

    /**
     * Filtering function returning list of ids fulfilling certain condition
     */
    getIdsFilteredByTags = () => {
        if (!isEqual(this.state.brand, [])) {
            return getProductsIdsByTags(this.state.tags)
                .then(result => {
                    return mapGraphQlRawResultToListOfIds(result);
                });
        } else {
            return ALL;
        }
    };

    /**
     * Filtering function returning list of ids fulfilling certain condition
     */
    getIdsFilteredByName = () => {
        if (!isEqual(this.state.productName, '')) {
            return getProductsIdsByNameRegex(this.state.productName)
                .then(result => {
                    return mapGraphQlRawResultToListOfIds(result);
                });
        } else {
            return ALL;
        }
    };

    /**
     * Function combining the list of ids fulfilling all conditions
     */
    setIdsAfterFiltering = () => {
        if(!isDemo) {
            const promisesUsedForFiltering = [
                this.getIdsFilteredByMinimumAvgRating(),
                this.getIdsFilteredByPriceRange(),
                this.getIdsFilteredByBrand(),
                this.getIdsFilteredByTags(),
                this.getIdsFilteredByName(),
            ].filter(x => x !== ALL);

            Promise.all(promisesUsedForFiltering).then(result => {
                const idsFulfillingAllConditions = intersection(...result);
                this.props.setListOfIdsFilter(idsFulfillingAllConditions, {...this.state}, this.whichFilterApplied());
            });
        } else {
            this.props.setListOfIdsFilter(ALL, {...this.state}, this.whichFilterApplied());
        }
    };

    // </ Filtering Functions> -----------------

    render() {
        const {
            priceFrom,
            priceTo,
            minimumRating,
            minPriceInShop,
            maxPriceInShop,
            brand,
            brandsAvailableForSelect,
            tagsAvailableForSelect,
            tags,
            productName,
        } = this.state;

        return <Sider width={250} style={{background: '#fff'}}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%'}}
            >
                <div className='filtering-section'>
                    <div className="name-filter">
                        <span className='name-filter-label'>Name:</span>
                        <Input
                            placeholder="name"
                            className='name-input'
                            value={productName}
                            onChange={(event) => {
                                this.setState({productName: event.target.value})
                            }
                            }
                        />
                    </div>

                    <div className="price-from">
                        <span className='price-from-label'>Price from:</span>
                        <InputNumber
                            min={minPriceInShop}
                            max={maxPriceInShop}
                            style={{marginLeft: 16}}
                            value={priceFrom}
                            onChange={this.onChangePriceFrom}
                        />
                        <div className="slider-wrapper">
                            <Slider
                                min={minPriceInShop}
                                max={maxPriceInShop}
                                onChange={this.onChangePriceFrom}
                                value={typeof priceFrom === 'number' ? priceFrom : 0}
                                step={0.01}
                            />
                        </div>
                    </div>

                    <div className="price-to">
                        <span className='price-to-label'>Price to:</span>
                        <InputNumber
                            min={minPriceInShop}
                            max={maxPriceInShop}
                            style={{marginLeft: 16}}
                            value={priceTo}
                            onChange={this.onChangePriceTo}
                        />
                        <div className="slider-wrapper">
                            <Slider
                                min={minPriceInShop}
                                max={maxPriceInShop}
                                onChange={this.onChangePriceTo}
                                value={priceTo}
                                step={0.01}
                            />
                        </div>
                    </div>

                    <div className="minimum-rating">
                        <div className='minimum-rating-label'>Minimum rating:</div>
                        <div className="minimum-rating-rate-wrapper">
                            <Rate
                                allowHalf
                                defaultValue={3.5}
                                value={minimumRating}
                                onChange={this.onChangeMinimumRating}
                            />
                        </div>
                    </div>

                    <div className="brand-filter">
                        <div className='brand-filter-label'>Brand:</div>
                        <div className='brand-select-wrapper'>
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="Select a brand"
                                optionFilterProp="children"
                                value={brand}
                                onChange={(brand) => {
                                    this.setState({brand})
                                }}
                                onFocus={() => {
                                }}
                                onBlur={() => {
                                }}
                                onSearch={() => {
                                }}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    map(brandsAvailableForSelect, brand => {
                                        return <Option value={brand}>{brand}</Option>;
                                    })
                                }
                            </Select>
                        </div>
                    </div>

                    <div className="tags-filter">
                        <div className="tags-filter-label">
                            Tags:
                        </div>
                        <div className="tags-select-wrapper">
                            <Select
                                mode="tags"
                                style={{width: '100%'}}
                                placeholder="Tags"
                                value={tags}
                                onChange={(tags) => {
                                    this.setState({tags})
                                }}
                            >
                                {
                                    map(tagsAvailableForSelect, tag => {
                                        return <Option value={tag}>{tag}</Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>


                    {
                        <div
                            className="clear-filters-wrapper"
                            onClick={this.resetFilters}
                        >
                            <Button type="primary" shape="circle" icon="close"/> Reset filtering
                        </div>
                    }

                    <div
                        className="apply-button-wrapper"
                        onClick={() => {
                            this.setIdsAfterFiltering();
                        }}
                    >
                        <Button type="primary">Apply</Button>
                    </div>

                </div>
            </Menu>
        </Sider>;
    }
}