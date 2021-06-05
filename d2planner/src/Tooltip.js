import './Tooltip.css';
import {getTotalLevel} from './calculateSkillValue'
import formatDesclines from './formatDesclines';

const Tooltip = (props) => {
  const {skill, skillName, skillLevels, skillBonuses} = props;
  if (!skill) {
    return <div className='tooltipContainer'></div>
  }
  const totalLevel = getTotalLevel(skill, skillName, skillLevels, skillBonuses);

  const synergyLines = formatDesclines('dsc3', skill, totalLevel, skillLevels, skillBonuses);
  const currentLevelLines = formatDesclines('desc', skill, totalLevel, skillLevels, skillBonuses);
  const nextLevelLines = formatDesclines('desc', skill, totalLevel + 1, skillLevels, skillBonuses);

  return (
    <div className='tooltipContainer'>
      <SkillPreamble skill={skill} lvl={totalLevel} skillLevels={skillLevels} skillBonuses={skillBonuses}/>
      <CurrentLevel lvl={totalLevel} lines={currentLevelLines}/>
      <NextLevel lines={
        (totalLevel > 0)
        ? nextLevelLines.filter(item => (!currentLevelLines.includes(item)))
        : nextLevelLines
      }
      />
      <Synergies lines={synergyLines}/>
    </div>
  );
};

const SkillPreamble = (props) => {
  const {skill, lvl, skillLevels, skillBonuses} = props;
  const preambleItems = formatDesclines('dsc2', skill, lvl, skillLevels, skillBonuses).map((line, index) => (
    <li key={index}>{line}</li>
  ));
  return (
    <div className='skillPreamble'>
      <h2 className='skillName'>{props.skill['strName']}</h2>
      <p className='skillLongName'>{props.skill['strLong'] + '\n'}</p>
      <ul className='dsc2'>{preambleItems}</ul>
    </div>
  );
};

const CurrentLevel = (props) => {
  if (props.lvl === 0) {
    return null;
  }
  const currentLevelItems = props.lines.map((line, index) => (<li key={index}>{line}</li>));
  return (
    <div className='currentLevelBlock'>
      <h3 className='currentLevelHeader levelHeader'>{`Current Level: ${props.lvl}`}</h3>
      <ul className='desc'>{currentLevelItems}</ul>
    </div>
  );
};

const NextLevel = (props) => {
  const nextLevelItems = props.lines.map((line, index) => (<li key={index}>{line}</li>));
  return (
    <div className='nextLevelBlock'>
      <h3 className='nextLevelHeader levelHeader'>Next Level:</h3>
      <ul className='desc'>{nextLevelItems}</ul>
    </div>
  );
};

const Synergies = (props) => {
  const synergyItems = props.lines.map((line, index) => (<li key={index}>{line}</li>));
  return (
    <div className='synergyBlock'>
      {(props.lines.length > 0) ? <h3 className='synergyHeader'>Synergy Bonuses:</h3> : null}
      <ul className='dsc3'>{synergyItems}</ul>
    </div>
  );
};

export default Tooltip;
