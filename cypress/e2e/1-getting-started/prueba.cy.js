describe ('Validacion de Login', ()=>{
    beforeEach(()=>{
        cy.visit("/")
        cy.get('.login_logo').should('be.visible').and('contain','Swag Labs')
       
    })
    it("verificar url e ingresar de manera exitosa", () => {
        cy.login('standard_user','secret_sauce') 
        cy.get('[data-test="title"]').should("contain.text","Products")
       
    })

    it("verificar url e ingresar de manerra fallida", () => {
        cy.url().should('not.include', '/inventory.html');
        cy.login('standard','secretuce') 
        cy.get('[data-test="error"]').should("contain.text","Epic sadface: Username and password do not match any user in this service")
       
    })

})

describe ('Verificacion del flujo de compra', ()=>{   
    beforeEach(()=>{
        cy.visit("/")
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html')
    }) 
    it('Agregar tres productos al carrito', () => {
        // Agregar productos
        cy.get('.inventory_item').first().find('button').contains('Add to cart').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.inventory_item').eq(4).find('button').contains('Add to cart').click();
      
        //se valida que el carrito contenga los 3 productos y se valida que estemos en la pagina
         cy.get('.shopping_cart_badge').should("contain","3").click()

      });
    
      it('Completar proceso de compra y logout', () => {
        cy.get('.inventory_item').first().find('button').contains('Add to cart').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.inventory_item').eq(4).find('button').contains('Add to cart').click();
        cy.get('.shopping_cart_badge').should("contain","3").click()

        //Se remueve y se valida el objeto eliminado y se continua con elflujode compra
        cy.get('.cart_item').first().find('button').contains('Remove').click();
        cy.get('[data-test="shopping-cart-link"]').should("contain","2")
        // Ir al carrito
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
       
        
        // Checkout
        cy.get('#checkout').click();
        cy.url().should('include', '/checkout-step-one.html');
        
        // Datos de envío del cliente y continuar
        cy.get('#first-name').type("Jhon Eduard");
        cy.get('#last-name').type("Agudelo");
        cy.get('#postal-code').type("34rt3");
        cy.get('#continue').click();
        
        // Verificar resumen    
        cy.url().should('include', '/checkout-step-two.html');
        cy.get('.summary_info').should('be.visible');
        
        //Visualizacion de mensaje de exito y logout
        cy.get('[data-test="finish"]').click();
        cy.get("h2").should("contain.text","Thank you for your order!")

        //Validacion de log out
        cy.get("#react-burger-menu-btn").click().should("be.visible")
        cy.get('[data-test="logout-sidebar-link"]').click()
          
      })
      
   
 })