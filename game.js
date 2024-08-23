import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
    constructor() {
        this.hp = 100;
        this.atk = 5;

    }

    attack(Monster) {
        Monster.hp - this.atk;
    }
}

class Monster {
    constructor() {
        this.hp = 10;
        this.atk = 2.5;
    }

    attack(Player) {
        Player.hp - this.atk;
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
}

const battle = async (stage, player, monster) => {
    let logs = [];

    while(player.hp > 0 && monster.hp > 0) {
        console.clear();
        displayStatus(stage, player, monster);

        logs.forEach((log) => console.log(log));

        console.log(
            chalk.green(
                `\n1. 공격한다 2. 아무것도 하지않는다.`,
            ),
        );
        const choice = readlineSync.question('당신의 선택은? ');

        // 플레이어의 선택에 따라 다음 행동 처리
        logs.push(chalk.green(`${choice}를 선택하셨습니다.`));

        switch (choice) {
            case '1':
                logs.push(`몬스터에게 ${player.atk}의 피해를 입혔습니다.`)
                player.attack(monster);
                break;
            case '2':

                break;
            default:
                console.log(chalk.red(`올바른 선택을 하세요.`));
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