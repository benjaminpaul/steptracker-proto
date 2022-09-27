/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import Fitness from '@ovalmoney/react-native-fitness';
import {format, parseISO} from 'date-fns';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const StepsTable: React.FC<{
  steps: Fitness.StepRecord[];
}> = ({steps}) => {
  console.log(steps);
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      {steps.map(s => (
        <View key={s.startDate}>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            {format(parseISO(s.startDate), 'PPP')}
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            {s.quantity}
          </Text>
        </View>
      ))}
    </>
  );
};

const DistancesTable: React.FC<{
  distances: Fitness.DistanceRecord[];
}> = ({distances}) => {
  console.log(distances);
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      {distances.map(s => (
        <View key={s.startDate}>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            {format(parseISO(s.startDate), 'PPP')}
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            {s.quantity}
          </Text>
        </View>
      ))}
    </>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [steps, setSteps] = useState<Fitness.StepRecord[]>([]);
  const [distances, setDistances] = useState<Fitness.DistanceRecord[]>([]);

  const permissions = [
    {
      kind: Fitness.PermissionKinds.Steps,
      access: Fitness.PermissionAccesses.Read,
    },
    {
      kind: Fitness.PermissionKinds.Distances,
      access: Fitness.PermissionAccesses.Read,
    },
  ];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const requestPermission = () => {
    Fitness.requestPermissions(permissions)
      .then(authorized => {
        console.log(authorized);
      })
      .catch(error => {
        console.error('Error requesting permissions:', error);
      });
  };

  const getSteps = () => {
    const now = new Date();
    Fitness.getSteps({
      startDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7,
      ).toISOString(),
      endDate: new Date().toISOString(),
    })
      .then(result => {
        console.log('Setting result...', result);
        setSteps(result);
      })
      .catch(error => {
        console.error('Error getting steps...', error);
      });
  };

  const getDistances = () => {
    const now = new Date();
    Fitness.getDistances({
      startDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7,
      ).toISOString(),
      endDate: new Date().toISOString(),
    })
      .then(result => {
        console.log('Setting distances result...', result);
        setDistances(result);
      })
      .catch(error => {
        console.error('Error getting distances...', error);
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button onPress={requestPermission} title="Request permission" />
          <Button onPress={getSteps} title="Get steps" />
          <Button onPress={getDistances} title="Get distances" />

          <StepsTable steps={steps} />
          <DistancesTable distances={distances} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
