import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
    constructor() {
        this.hp = 100;
        this.atk = 5;

    }

    attack(Monster) {
        Monster.hp = Monster.hp - this.atk;
    }

    heal() {
        this.hp += 30;
    }

    gainAtk() {
        this.atk += 2;
    }
}

class Monster {
    constructor(stage) {
        this.hp = 10 * stage;
        this.atk = 2 + stage;
    }

    attack(player) {
        player.hp = player.hp - this.atk;
    }
}

function displayStatus(stage, player, monster) {
    console.log(chalk.magentaBright(`\n=== Current Status ===`));
    console.log(
        chalk.cyanBright(`| Stage: ${stage} `) +
        chalk.blueBright(
            `| Player HP : ${player.hp}, ATK : ${player.atk} |`
        ) +
        chalk.redBright(
            `| Monster HP : ${monster.hp}, ATK : ${monster.atk}|`,
        ),
    );
    console.log(chalk.magentaBright(`=====================\n`));
    console.log(chalk.rgb(255, 165, 0)(`야생의 몬스터를 마주쳤습니다!`))

}

const battle = async (stage, player, monster) => {
    let logs = [];
    let consoleCount = 0;

    while (player.hp > 0) {
        console.clear();
        displayStatus(stage, player, monster);
        logs.forEach((log) => console.log(log));

        console.log(
            chalk.green(
                `\n1. 공격한다 2. 도망친다.`,
            ),
        );
        const choice = readlineSync.question('당신의 선택은? ');

        // 플레이어의 선택에 따라 다음 행동 처리
        // logs.push(chalk.green(`${choice}를 선택하셨습니다.`));

        switch (choice) {
            case '1':
                logs.push(chalk.green(`[${consoleCount}] 몬스터에게 ${player.atk}의 피해를 입혔습니다.`))
                player.attack(monster);
                break;
            case '2':
                console.log(chalk.green(`[${consoleCount}] 몬스터에게서 도망쳤습니다.`))
                logs.forEach((log) => console.log(log));
                await new Promise(resolve => setTimeout(resolve, 1000));
                player.heal();
                player.gainAtk();
                return;
            default:
                console.log(chalk.red(`올바른 선택을 하세요.`));
        }
        logs.push(chalk.red(`[${consoleCount}] 몬스터가 ${monster.atk} 피해를 입혔습니다.`));
        consoleCount++;
        monster.attack(player);
        if (monster.hp <= 0 && stage < 10) {
            console.log(chalk.green(`몬스터를 처치 하였습니다 다음 스테이지로 넘어갑니다.`));
            logs.forEach((log) => console.log(log));
            await new Promise(resolve => setTimeout(resolve, 2000));
            player.heal();
            player.gainAtk();
            return;
        } else if (player.hp <= 0) {
            console.log(chalk.red(`당신은 죽었습니다.`));
            console.log(chalk.red(`게임 오버!`));
        } else if (monster.hp <= 0 && stage === 10) {
            console.log(chalk.green(`축하합니다! 모든 스테이지를 클리어했습니다!`));
            return;
        }
    }
};

export async function startGame() {
    console.clear();
    const player = new Player();
    let stage = 1;

    while (stage <= 10) {
        const monster = new Monster(stage);
        await battle(stage, player, monster);

        // 스테이지 클리어 및 게임 종료 조건

        stage++;

    }
}