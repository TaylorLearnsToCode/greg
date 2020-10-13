import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Monster } from '@shared/model/monster.model';
import { Weapon } from '@shared/model/weapon.model';
import { AttacksAndDamagePipe } from './attacks-and-damage.pipe';

@Component({
  selector: 'greg-test-component',
  template: `<span [innerHTML]="monster | attacksAndDamage: null:true"></span>`,
})
class TestComponent {
  monster: Monster;
}

describe('AttacksAndDamagePipe', () => {
  let pipe: AttacksAndDamagePipe;
  let testComponent: TestComponent;
  let testFixture: ComponentFixture<TestComponent>;
  let testMonster: Monster;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AttacksAndDamagePipe],
      providers: [AttacksAndDamagePipe],
    })
      .compileComponents()
      .then(() => {
        pipe = TestBed.inject(AttacksAndDamagePipe);
        testMonster = buildMonster();

        testFixture = TestBed.createComponent(TestComponent);
        testComponent = testFixture.componentInstance;
        testComponent.monster = testMonster;
        testFixture.detectChanges();
      });
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return Claw for 3-13', () => {
    expect(pipe.transform(testMonster)).toEqual('Claw! (3-13)');
  });

  it('should return a delimited string', () => {
    testMonster.attacks.push(new Weapon('Bite!', new DiceRolled(1, 12)));
    const expectedString = `Claw! (3-13)|Bite! (1-12)`;
    expect(pipe.transform(testMonster, '|', false)).toEqual(expectedString);
  });

  it('should return a SafeHTML', () => {
    const componentElement: HTMLSpanElement = (testFixture.nativeElement as HTMLElement)
      .firstElementChild as HTMLSpanElement;
    expect(componentElement.innerText).toEqual('Claw! (3-13)');
  });

  /* Utility Functions */
  function buildMonster(): Monster {
    const monster = new Monster();
    monster.attacks = [new Weapon('Claw!', new DiceRolled(2, 6, 1))];
    return monster;
  }
});
