import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'


const LOCATION = [
  {
    item: '0km-5km',
    id: '0-5',
  },
  {
    item: '5km-25km',
    id: '5-25',
  },
  {
    item: '25km-50km',
    id: '25-50',
  },
  {
    item: '~50km',
    id: '50',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
]

const GENDER = [
  {
    item: 'Male',
    id: 'ML',
  },
  {
    item: 'Female',
    id: 'FM',
  },
  {
    item: 'Both',
    id: 'BT',
  },
  {
    item: 'No Prefrence',
    id: 'NP'
  }
]

const PREF = [
  {
    item: 'Hetereosexual',
    id: 'HS',
  },
  {
    item: 'Bisexual',
    id: 'BS'
  },
  {
    item: 'Gay',
    id: 'GA',
  },
  {
    item: 'Pansexual',
    id: 'PS'
  }
]

const AGE = [
  {
    item: '18-25',
    id: '18-25',
  },
  {
    item: '26-35',
    id: '26-35',
  },
  {
    item: '36-45',
    id: '36-45',
  },
  {
    item: '46-55',
    id: '46-55'
  },
  {
    item: '55-65',
    id: '55-65'
  },
  {
    item: '~65',
    id: '65'
  }
  
]

const ProfileScreen = () => { 
  const [selectedTeam, setSelectedTeam] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])
  return (
    <View style={{ margin: 30 }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, paddingBottom: 20 }}>Filter</Text>
      </View>
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}> Gender</Text>
      <SelectBox
        label="Select multiple"
        options={GENDER}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />

    <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}> Prefrences</Text>
      <SelectBox
        label="Select multiple"
        options={PREF}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />

      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Distance</Text>
      <SelectBox
        label="Select single"
        options={LOCATION}
        value={selectedTeam}
        onChange={onChange()}
        hideInputFilter={false}
      />

    <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Age</Text>
      <SelectBox
        label="Select multiple"
        options={AGE}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
        />
        <View style={{flex: 1}}>
        <TouchableOpacity style={{ position: 'absolute', bottom: -100, backgroundColor:"#AA3FEC", width:170, height: 50, justifyContent: 'center', borderRadius: 20 }} 
      >
        <Text style={{ textAlign:'center' }} > Apply Filter </Text>
      </TouchableOpacity>

        </View>
        
    </View>

    
  )

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }

  function onChange() {
    return (val) => setSelectedTeam(val)
  }
}

export default ProfileScreen

