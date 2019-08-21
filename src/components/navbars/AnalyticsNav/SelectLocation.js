import React, { useEffect, useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import PropTypes from 'prop-types';
import { getAllLocationsFromCache, getUserLocation } from '../../helpers/QueriesHelpers';

const SelectLocation = ({ active, handleLocationChange, defaultLocation }) => {
  const [locationsFromCache, setLocationsFromCache] = useState([]);
  let location;

  if (defaultLocation) {
    location = defaultLocation;
  } else {
    location = getUserLocation().name;
  }

  useEffect(() => {
    async function getLocationsFromCache() {
      const allLocations = await getAllLocationsFromCache();
      setLocationsFromCache(allLocations);
    }
    getLocationsFromCache();
  }, []);

  return (
    <ApolloConsumer>
      {
        client => (
          <div className={`btn-right__location__dropdown${active ? ' btn-right__location__dropdown--active' : ''}`}>
            <div
              className="btn-right__location__dropdown__background"
            >
              {
              locationsFromCache && locationsFromCache.map(({ name }) => (
                  name === location ? null : <button key={name} />
                  ))
                }
            </div>
            <div
              className="btn-right__location__dropdown__background btn-right__location__dropdown__background--foreground"
            >
              {
                locationsFromCache && locationsFromCache.map(loc => (
                  loc.name === location
                    ? null
                    : (
                      <button
                        className="location__btn"
                        key={loc.name}
                        onClick={async () => {
                            await client.writeData({ data: { userLocation: loc } });
                            handleLocationChange(loc.id, loc.name);
                          }
                        }
                      />
                    )
                ))
              }
            </div>
            <div className="btn-right__location__dropdown__text">
              {
                locationsFromCache && locationsFromCache.map(({ name }) => (
                  name === location ? null : (
                    <div
                      key={name}
                      className="btn-right__location__dropdown__text__item"
                    >
                      {name}
                    </div>
                  )
                ))
              }
            </div>
          </div>
        )
      }
    </ApolloConsumer>
  );
};

SelectLocation.propTypes = {
  active: PropTypes.bool.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
  defaultLocation: PropTypes.string.isRequired,
};

export default SelectLocation;
