import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { ICart, IMenu } from "../../../types/order";
import { getMenus } from "../../../services/menu.service";
import styles from "./CreateOrder.module.css";
import { filters, tables } from "./CreateOrder.constants";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

const CreateOrder = () => {
  const [menus, setMenus] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [carts, setCarts] = useState<ICart[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getMenus(searchParams.get("category") as string);
      setMenus(result.data);
    };
    fetchOrder();
  }, [searchParams.get("category")]);

  return (
    <main>
      <div className={styles.create}>
        <div className={styles.menu}>
          <h1>Explore Our Best Menu</h1>
          <div className={styles.filter}>
            {filters.map((filter) => (
              <Button
                type="button"
                color={
                  (!searchParams.get("category") && filter === "All") ||
                  filter === searchParams.get("category")
                    ? "primary"
                    : "secondary"
                }
                key={filter}
                onClick={() =>
                  setSearchParams(filter === "All" ? {} : { category: filter })
                }
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className={styles.list}>
            {menus.map((item: IMenu) => (
              <div className={styles.item} key={item.id}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className={styles.image}
                />
                <h2>{item.name}</h2>
                <div className={styles.bottom}>
                  <p className={styles.price}>$ {item.price}</p>
                  <Button onClick={() => {}}>Order</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className={styles.form}>
          <div>
            <div className={styles.header}>
              <h2 className={styles.title}>Customer Information</h2>
              <Link to="/orders">
                <Button color="secondary">Cancel</Button>
              </Link>
            </div>
            <div className={styles.input}>
              <Input
                id="name"
                label="Name"
                name="customerName"
                placeholder="Insert Name"
                required
              />
              <Select
                id="name"
                label="Table Number"
                name="tableNumber"
                options={tables}
                required
              />
            </div>
          </div>
          <div>
            <div className={styles.header}>
              <h2 className={styles.title}>Current Order</h2>
            </div>
            {carts.length > 0 ? (
              <div className={styles.cart}>
                {carts.map((item: ICart) => (
                  <div className={styles.item} key={item.id}>
                    <h4 className={styles.name}>{item.name}</h4>
                    <div className={styles.quantity}>
                      <Button onClick={() => {}} color="secondary">
                        -
                      </Button>
                      <div className={styles.number}>{item.quantity}</div>
                      <Button onClick={() => {}} color="secondary">
                        +
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="submit">Order</Button>
              </div>
            ) : (
              <div className={styles.cart}>
                <h4>Cart is empty!</h4>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateOrder;
