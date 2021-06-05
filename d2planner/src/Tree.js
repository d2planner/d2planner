import './Tree.css';
import {getTotalBonus} from './calculateSkillValue'
import CharacterSpace from './CharacterSpace'
import Skill from './Skill'
import Tab from './Tab';
import images from './assets/1.14D/game_images';

const Tree = (props) => {
  const {skillLevels, skillBonuses, treeData, character, currentTab} = props;

  const setSkillLevel = createSkillLevelSetter(character, skillLevels, props.setSkillLevels);
  const setBonusLevel = createSkillLevelSetter(character, skillBonuses, props.setSkillBonuses);

  const generalBonus = (skillBonuses.all || 0) + (skillBonuses[`tab${currentTab}`] || 0);
  const skills = treeData[currentTab]['skills'].map((skill) => {
    const lvl = skillLevels[skill.skillName] || 0;
    const skillBonus = skillBonuses[skill.skillName] || 0;
    return (
      <Skill
          {...skill}
          lvl={lvl}
          bonus={getTotalBonus(lvl, skillBonus, generalBonus)}
          key={skill.skillName}
          setSkillLevel={setSkillLevel}
          setCurrentSkill={props.setCurrentSkill}
      />
    )
  });
  const tabs = [1, 2, 3].map((id) => (
    <Tab
      key={id}
      id={id}
      treeName={treeData[id]['treeName']}
      treeBonus={skillBonuses[`tab${id}`] || 0}
      setTab={props.setTab}
      setBonusLevel={setBonusLevel}
    />
  ))
  return (
    <div className='treeContainer'>
      <img
        className='tree'
        src={images[`${character}Tree${currentTab}`]}
        alt='Skill Tree'
      />
      {skills}
      {tabs}
      <CharacterSpace
        character={character}
        allBonus={skillBonuses.all || 0}
        setBonusLevel={setBonusLevel}
      />
    </div>
  );
};

function createSkillLevelSetter (character, skillLevels, setStateFunction) {
  function setter (key, lvl) {
    lvl = Math.floor(Number(lvl));
    if (!(lvl >= 0)) {
      return
    } 
    if (lvl === 0) {
      let skillLevelsNew = {...skillLevels};
      delete skillLevelsNew[key]
      setStateFunction(character, skillLevelsNew);
      return
    }
    setStateFunction(character, { ...skillLevels, [key]: lvl});
  }
  return setter;
}

export default Tree;
