import pygame
import sys
from settings import *
from sprites import Player, Asteroid, Bullet

class Game:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("Space Shooter - Estilo Atari")
        self.clock = pygame.time.Clock()
        self.font_name = pygame.font.match_font('arial')
        self.running = True

    def new(self):
        self.all_sprites = pygame.sprite.Group()
        self.asteroids = pygame.sprite.Group()
        self.bullets = pygame.sprite.Group()
        
        self.player = Player()
        self.all_sprites.add(self.player)
        
        self.score = 0
        
        max_asteroids = 4
        for i in range(max_asteroids):
            self.spawn_asteroid()

        self.run()

    def spawn_asteroid(self):
        a = Asteroid(self.score)
        self.all_sprites.add(a)
        self.asteroids.add(a)

    def run(self):
        self.playing = True
        while self.playing:
            self.clock.tick(FPS)
            self.events()
            self.update()
            self.draw()

    def events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                if self.playing:
                    self.playing = False
                self.running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    self.player.shoot(self.all_sprites, self.bullets)

    def update(self):
        self.all_sprites.update()

        # Checar colisão de tiros com asteroides
        hits = pygame.sprite.groupcollide(self.asteroids, self.bullets, True, True)
        for hit in hits:
            self.score += 1
            self.spawn_asteroid()

        # Checar se o asteroide chegou ao fundo da tela
        for a in self.asteroids:
            if a.rect.top > HEIGHT:
                self.playing = False # Perdeu!

        # Checar colisão da nave com asteroide
        hits = pygame.sprite.spritecollide(self.player, self.asteroids, False)
        if hits:
            self.playing = False # Perdeu!

        # Manter a quantidade de asteroides dinâmica baseada na pontuação
        max_asteroids = min(12, 4 + (self.score // 10))
        while len(self.asteroids) < max_asteroids:
            self.spawn_asteroid()

    def draw(self):
        self.screen.fill(BLACK)
        self.all_sprites.draw(self.screen)
        
        # Pontuação no canto superior esquerdo
        self.draw_text(self.screen, f"Pontos: {self.score}", 30, 10, 10, align="topleft")
        
        pygame.display.flip()

    def draw_text(self, surf, text, size, x, y, align="midtop"):
        font = pygame.font.Font(self.font_name, size)
        text_surface = font.render(text, True, WHITE)
        text_rect = text_surface.get_rect()
        if align == "midtop":
            text_rect.midtop = (x, y)
        elif align == "topleft":
            text_rect.topleft = (x, y)
        surf.blit(text_surface, text_rect)

    def show_go_screen(self):
        if not self.running:
            return
        self.screen.fill(BLACK)
        self.draw_text(self.screen, "GAME OVER", 64, WIDTH / 2, HEIGHT / 4)
        self.draw_text(self.screen, f"Sua Pontuação Final: {self.score}", 30, WIDTH / 2, HEIGHT / 2)
        self.draw_text(self.screen, "Pressione qualquer tecla para continuar", 18, WIDTH / 2, HEIGHT * 3 / 4)
        pygame.display.flip()
        self.wait_for_key()

    def wait_for_key(self):
        waiting = True
        while waiting:
            self.clock.tick(FPS)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    waiting = False
                    self.running = False
                if event.type == pygame.KEYUP:
                    waiting = False

if __name__ == "__main__":
    g = Game()
    while g.running:
        g.new()
        if g.running:
            g.show_go_screen()

    pygame.quit()
    sys.exit()
