abstract class Figure {
    protected constructor(public readonly name: string, public readonly color: string) {}

    abstract calculateArea(): number;
}

class Circle extends Figure {
    constructor(name: string, color: string, public radius: number) {
        super(name, color);
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

class Square extends Figure {
    constructor(name: string, color: string, public side: number) {
        super(name, color);
    }

    calculateArea(): number {
        return Math.pow(this.side, 2);
    }

    print(): string {
        return 'side * side';
    }
}

class Triangle extends Figure {
    constructor(name: string, color: string, public base: number, public height: number) {
        super(name, color);
    }

    calculateArea(): number {
        return this.base * this.height / 2;
    }
}

class Rectangle extends Figure {
    constructor(name: string, color: string, public sideA: number, public sideB: number) {
        super(name, color);
    }

    calculateArea(): number {
        return this.sideA * this.sideB;
    }

    print(): string {
        return 'a * b';
    }
}
